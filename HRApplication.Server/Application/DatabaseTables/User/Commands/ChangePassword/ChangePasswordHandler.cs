using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ChangePassword
{
    public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, ErrorOr<Unit>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ChangePasswordHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<Unit>> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if(_userRepository.GetUserById(Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.InvalidCredentials;
            }
            if (user.Password != request.password)
            {
                return CustomErrorOr.CustomErrors.User.WrongPassword;
            }
            user.Password = request.newPassword;

            _userRepository.UpdateUser(user);

            return Unit.Value;
        }
    }
}
