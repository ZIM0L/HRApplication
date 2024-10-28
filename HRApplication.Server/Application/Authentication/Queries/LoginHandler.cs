using Application.Authentication;
using ErrorOr;
using HRApplication.Server.Application.Interfaces;
using MediatR;
using ReactApp1.Server.Application.Interfaces.Authentication;
using ReactApp1.Server.Infrastructure.Authentication;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace HRApplication.Server.Application.Authentication.Queries
{
    public class LoginHandler : IRequestHandler<LoginRequest, ErrorOr<AuthenticationResult>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        public LoginHandler(IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator)
        {
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

            return new AuthenticationResult(
                    user,
                    token);
        }
    }
}
