using Application.Authentication;
using ErrorOr;
using HRApplication.Server.Application.Interfaces;
using MediatR;
using ReactApp1.Server.Application.Interfaces.Authentication;

namespace HRApplication.Server.Application.Authentication.Queries
{
    public class LoginHandler : IRequestHandler<LoginRequest, ErrorOr<AuthenticationResult>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor; // Dodaj IHttpContextAccessor
        public LoginHandler(IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }
        public async Task<ErrorOr<AuthenticationResult>> Handle(LoginRequest query, CancellationToken cancellationToken)
        {

        await Task.CompletedTask;

            if (_userRepository.GetUserByEmail(query.email) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.InvalidCredentials;
            }
            // validate password
            if (user.Password != query.password)
            {
                return CustomErrorOr.CustomErrors.User.WrongPassword;
            }
            //generate token
            string token = _jwtTokenGenerator.GenerateToken(user);

            var refreshToken = _jwtTokenGenerator.GenerateRefreshToken(token);
            user.UpdatedAt = DateTime.UtcNow;
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            _userRepository.UpdateUser(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // Ciasteczko dostępne tylko dla HTTP
                Expires = DateTime.UtcNow.AddDays(7), // Ustaw czas wygaśnięcia
                SameSite = SameSiteMode.Strict // Ustawienie na ciasteczka pierwszej strony
            };

            _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);

            return new AuthenticationResult(
                    user,
                    token,
                    refreshToken);
        }
    }
}
