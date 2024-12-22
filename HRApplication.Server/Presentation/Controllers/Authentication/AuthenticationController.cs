using ErrorOr;
using HRApplication.Server.Application.Authentication.AuthenticationResults;
using HRApplication.Server.Application.Authentication.Commands;
using HRApplication.Server.Application.Authentication.Queries;
using HRApplication.Server.Application.Interfaces.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Application.Interfaces.Authentication;
using ReactApp1.Server.Presentation.Api.Controllers;
using System.Security.Claims;
using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;

namespace HRApplication.Server.Presentation.Controllers.Authentication
{
    [AllowAnonymous]
    [Route("/auth")]
    public class AuthenticationController : ErrorController
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthenticationController(
           IMediator mediator,
           IConfiguration configuration,
           IUserRepository userRepository,
           IJwtTokenGenerator jwtTokenGenerator,
           IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _configuration = configuration;
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        [Route("/auth/register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {

            var command = new RegisterRequest(
                request.name,
                request.surname,
                request.email,
                request.password,
                request.phone
                );

            ErrorOr<AuthenticationResult> response = await _mediator.Send(command); //pipieline


            return response.Match(
                response => Ok(response),
                errors => Problem(errors));

        }
        [HttpPost]
        [Route("/auth/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {

            var query = new LoginRequest(
                request.email,
                request.password);

            ErrorOr<AuthenticationResult> response = await _mediator.Send(query); //pipieline


            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }
        [HttpGet]
        [Route("/auth/google-login")]
        public IActionResult GoogleLogin(string returnUrl = "")
        {
            var redirectUrl = Url.Action("GoogleResponse", "Authentication", new { returnUrl });
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, "Google");
        }
        [HttpGet]
        public async Task<IActionResult> GoogleResponse(string returnUrl = "")
        {
            // Uzyskanie danych z Google
            var info = await HttpContext.AuthenticateAsync("Google");

            if (info == null || info.Principal == null)
            {
                return BadRequest("Nie udało się uzyskać danych użytkownika.");
            }

            // Zbieranie danych o użytkowniku
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            var firstName = info.Principal.FindFirstValue(ClaimTypes.GivenName);
            var lastName = info.Principal.FindFirstValue(ClaimTypes.Surname);

            // Uzyskanie tokenu dostępowego z kontekstu
            var accessToken = info.Properties.GetTokenValue("access_token");
            var accessTokentest = info.Properties.GetTokens();
            var googleRefreshToken = info.Properties.GetTokenValue("refresh_token");
            var googleAccessTokenExpiry = info.Properties.ExpiresUtc?.UtcDateTime;

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is missing.");
            }

            var existingUser = _userRepository.GetUserByEmail(email);
            string token;
            string refreshToken;

            if (existingUser == null)
            {
                // Rejestracja nowego użytkownika
                var newUser = new User(
                    name: firstName,
                    surname: lastName,
                    email: email,
                    password: null,
                    phoneNumber: null
                );
                newUser.CreatedAt = DateTime.UtcNow;
                newUser.IsGoogleLoggedIn = true;
                newUser.GoogleRefreshToken = googleRefreshToken;
                newUser.GoogleRefreshTokenExpiryTime = googleAccessTokenExpiry;

                token = _jwtTokenGenerator.GenerateToken(newUser);
                refreshToken = _jwtTokenGenerator.GenerateRefreshToken(token);

                newUser.RefreshToken = refreshToken;
                newUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

                _userRepository.AddUser(newUser);
            }
            else
            {
                existingUser.IsGoogleLoggedIn = true;
                existingUser.GoogleRefreshToken = googleRefreshToken;
                existingUser.GoogleRefreshTokenExpiryTime = googleAccessTokenExpiry;
                existingUser.UpdatedAt = DateTime.UtcNow;

                token = _jwtTokenGenerator.GenerateToken(existingUser);
                refreshToken = _jwtTokenGenerator.GenerateRefreshToken(token);

                existingUser.RefreshToken = refreshToken;
                existingUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

                _userRepository.UpdateUser(existingUser);
            }

            AppendRefreshTokenToCookie(refreshToken);

            var frontendUrl = $"https://localhost:5173/auth/google-handler?token={token}";
            return Redirect(frontendUrl);
        }

        private void AppendRefreshTokenToCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // Ciasteczko dostępne tylko dla HTTP
                Expires = DateTime.UtcNow.AddDays(7), // Ustaw czas wygaśnięcia
                SameSite = SameSiteMode.Strict // Ograniczenie do ciasteczek pierwszej strony
            };

            _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }


    }
}
