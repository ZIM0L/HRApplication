using ErrorOr;
using MediatR;
using ReactApp1.Server.Application.Interfaces.Authentication;
using HRApplication.Server.Application.CustomErrorOr;
using HRApplication.Server.Application.Authentication.Services.RefreshToken;
using HRApplication.Server.Application.Authentication.AuthenticationResults;
using HRApplication.Server.Application.Interfaces.Repositories;

public class RefreshTokenHandler : IRequestHandler<RefreshTokenRequest, ErrorOr<AuthenticationResult>>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IHttpContextAccessor _httpContextAccessor; // Dodaj IHttpContextAccessor

    public RefreshTokenHandler(IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<ErrorOr<AuthenticationResult>> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;

        string decodedRefreshToken = Uri.UnescapeDataString(request.refreshToken);

        var user = _userRepository.GetUserByRefreshToken(decodedRefreshToken);

        if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            return CustomErrors.User.InvalidRefreshToken;
        }

        // Wygeneruj nowy `access token`
        string newAccessToken = _jwtTokenGenerator.GenerateToken(user);

        // (Opcjonalnie) Wygeneruj nowy `refresh token` i zaktualizuj bazę
        string newRefreshToken = _jwtTokenGenerator.GenerateRefreshToken(newAccessToken);


        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); // np. 7 dni ważności

        _userRepository.UpdateUser(user);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true, // Ciasteczko dostępne tylko dla HTTP
            Expires = DateTime.UtcNow.AddDays(7), // Ustaw czas wygaśnięcia
            SameSite = SameSiteMode.Strict // Ustawienie na ciasteczka pierwszej strony
        };

        _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", newRefreshToken, cookieOptions);
        
        return new AuthenticationResult(user, newAccessToken);
    }
}
