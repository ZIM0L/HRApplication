using Application.Authentication;
using ErrorOr;
using HRApplication.Server.Application.Interfaces;
using MediatR;
using ReactApp1.Server.Application.Interfaces.Authentication;
using HRApplication.Server.Application.CustomErrorOr;
using HRApplication.Server.Application.Authentication.Services.RefreshToken;

public class RefreshTokenHandler : IRequestHandler<RefreshTokenRequest, ErrorOr<AuthenticationResult>>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RefreshTokenHandler(IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<ErrorOr<AuthenticationResult>> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;

        var user = _userRepository.GetUserByRefreshToken(request.refreshToken);

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

        // Zwróć nowe tokeny
        return new AuthenticationResult(user, newAccessToken, newRefreshToken);
    }
}
