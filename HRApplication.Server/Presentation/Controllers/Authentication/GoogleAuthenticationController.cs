using HRApplication.Server.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReactApp1.Server.Application.Interfaces.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class GoogleAuthenticationService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public GoogleAuthenticationService(
        IHttpContextAccessor httpContextAccessor,
        IConfiguration configuration,
        IUserRepository userRepository,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _httpContextAccessor = httpContextAccessor;
        _configuration = configuration;
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<IActionResult> HandleGoogleResponse()
    {
        // Uzyskanie danych z Google
        var info = await _httpContextAccessor.HttpContext.AuthenticateAsync("Google");

        if (info == null || info.Principal == null)
        {
            return new BadRequestObjectResult("Failed to obtain user data.");
        }

        // Zbieranie danych o użytkowniku
        var email = info.Principal.FindFirstValue(ClaimTypes.Email);
        var firstName = info.Principal.FindFirstValue(ClaimTypes.GivenName);
        var lastName = info.Principal.FindFirstValue(ClaimTypes.Surname);

        var refreshTokenGoogle = info.Properties.GetTokenValue("refresh_token");

        var existingUser = _userRepository.GetUserByEmail(email);
        string token;
        string refreshToken;

        if (existingUser == null)
        {
            var newUser = new User(firstName, lastName, email)
            {
                IsGoogleLoggedIn = true,
                GoogleRefreshToken = refreshTokenGoogle,
                GoogleRefreshTokenExpiryTime = DateTime.UtcNow.AddDays(30),
                CreatedAt = DateTime.UtcNow
            };

            token = _jwtTokenGenerator.GenerateToken(newUser);
            refreshToken = _jwtTokenGenerator.GenerateRefreshToken(token);

            newUser.RefreshToken = refreshToken;
            newUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            _userRepository.AddUser(newUser);
        }
        else
        {
            token = _jwtTokenGenerator.GenerateToken(existingUser);
            refreshToken = _jwtTokenGenerator.GenerateRefreshToken(token);

            existingUser.RefreshToken = refreshToken;
            existingUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            existingUser.GoogleRefreshToken = refreshTokenGoogle;
            existingUser.GoogleRefreshTokenExpiryTime = DateTime.UtcNow.AddDays(30);
            existingUser.IsGoogleLoggedIn = true;

            _userRepository.UpdateUser(existingUser);
        }

        return new OkObjectResult(new { Token = token, RefreshToken = refreshToken });
    }

    public async Task<string> RefreshGoogleAccessToken(string refreshToken)
    {
        var clientId = _configuration["Authentication:Google:ClientId"];
        var clientSecret = _configuration["Authentication:Google:ClientSecret"];

        var requestBody = new Dictionary<string, string>
        {
            { "client_id", clientId },
            { "client_secret", clientSecret },
            { "refresh_token", refreshToken },
            { "grant_type", "refresh_token" }
        };

        var requestContent = new FormUrlEncodedContent(requestBody);
        var response = await _httpContextAccessor.HttpContext.RequestServices.GetService<HttpClient>().PostAsync("https://oauth2.googleapis.com/token", requestContent);

        if (!response.IsSuccessStatusCode)
        {
            var errorDetails = await response.Content.ReadAsStringAsync();
            throw new Exception($"Unable to refresh access token. Error: {errorDetails}");
        }

        var responseData = await response.Content.ReadAsStringAsync();
        var jsonResponse = JsonSerializer.Deserialize<Dictionary<string, string>>(responseData);

        if (jsonResponse != null && jsonResponse.ContainsKey("access_token"))
        {
            return jsonResponse["access_token"];
        }

        throw new Exception("Failed to obtain new access token.");
    }
}
