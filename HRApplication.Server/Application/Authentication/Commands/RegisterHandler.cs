using ErrorOr;
using HRApplication.Server.Application.Authentication.AuthenticationResults;
using HRApplication.Server.Application.Interfaces;
using MediatR;
using ReactApp1.Server.Application.Interfaces.Authentication;

namespace HRApplication.Server.Application.Authentication.Commands
{
    public class RegisterHandler : IRequestHandler<RegisterRequest, ErrorOr<AuthenticationResult>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor; 
        private readonly IRolesRepository _rolesRepository;
        public RegisterHandler(IUserRepository userRepository,
                               IJwtTokenGenerator jwtTokenGenerator,
                               IHttpContextAccessor httpContextAccessor,
                               IRolesRepository rolesRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _rolesRepository = rolesRepository;
        }

        public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var user = new User
            (
                request.name,
                request.surname,
                request.email,
                request.password,
                request.phone
            );

            if (_rolesRepository.CheckIfRoleNameExists(request.roleName) == false)
            {
                return CustomErrorOr.CustomErrors.Role.NoRoleExists;
            }

            user.RoleName = request.roleName;

            if (_userRepository.GetUserByEmail(user.Email) is User)
            {
                return CustomErrorOr.CustomErrors.User.DuplicatedEmailError;
            }

            var token = _jwtTokenGenerator.GenerateToken(user);

            var refreshToken = _jwtTokenGenerator.GenerateRefreshToken(token);
            user.UpdatedAt = DateTime.UtcNow;
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            _userRepository.AddUser(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // Ciasteczko dostępne tylko dla HTTP
                Expires = DateTime.UtcNow.AddDays(7), // Ustaw czas wygaśnięcia
                SameSite = SameSiteMode.Strict // Ustawienie na ciasteczka pierwszej strony
            };

            _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);

            return new AuthenticationResult
            (
                user,
                token
            );
        }
    }
}
