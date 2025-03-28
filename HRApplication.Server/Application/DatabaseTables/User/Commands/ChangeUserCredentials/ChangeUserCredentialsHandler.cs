using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models.UserSearchDTO;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ChangeUserCredentials
{
    public class ChangeUserCredentialsHandler : IRequestHandler<ChangeUserCredentialsRequest, ErrorOr<Unit>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ChangeUserCredentialsHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<Unit>> Handle(ChangeUserCredentialsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var user = _userRepository.GetUserById(Guid.Parse(BearerCheckerResult.Value.Payload.Sub));
            if (user == null) {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }
            if (user.Password != request.password)
            {
                return CustomErrorOr.CustomErrors.User.InvalidPassword;
            }
            user.Name = request.name;
            user.Surname = request.surname;
            user.Email = request.email;
            user.PhoneNumber = request.phoneNumber;
            user.UpdatedAt = DateTime.Now;

            _userRepository.UpdateUser(user);


            return Unit.Value;
        }
    }
}
