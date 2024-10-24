using Application.Authentication;
using ErrorOr;
using HRApplication.Server.Application.Interfaces;
using MediatR;
using ReactApp1.Server.Application.Interfaces.Authentication;

namespace HRApplication.Server.Application.Authentication.Commands
{
    public class RegisterHandler : IRequestHandler<RegisterRequest, ErrorOr<AuthenticationResult>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        public RegisterHandler(IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
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

            if (_userRepository.GetUserByEmail(user.Email) is User)
            {
                throw new InvalidOperationException("email taken");
            }

            var token = _jwtTokenGenerator.GenerateToken(user);

             _userRepository.AddUser(user);

            return new AuthenticationResult
            (
                user,
                token
            );
        }
    }
}
