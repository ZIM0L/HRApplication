using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Queries.CheckIfAnyInvitationForUser
{
    public class CheckIfAnyInvitationForUserHandler : IRequestHandler<CheckIfAnyInvitationForUserRequest, ErrorOr<Boolean>>
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CheckIfAnyInvitationForUserHandler(IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor)
        {
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<bool>> Handle(CheckIfAnyInvitationForUserRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            return _invitationRepository.CheckIfAnyInvitationForUser(Guid.Parse(BearerCheckerResult.Value.Payload.Sub));
        }
    }
}
