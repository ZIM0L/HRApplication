using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using MediatR;

namespace HRApplication.Server.Application.Authentication.Queries.ValidateUser
{
    public class ValidateUserHandler : IRequestHandler<ValidateUserRequest, ErrorOr<User>>
    {
        private readonly IUserRepository _userRepository;
        public ValidateUserHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<User>> Handle(ValidateUserRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            if (_userRepository.GetUserByGivenUser(request) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UsersTokenModified;
            }

            return user;
        }
    }
}
