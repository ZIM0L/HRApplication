using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands
{
    public class DeclineInvitationHandler : IRequestHandler<DeclineInvitationRequest, ErrorOr<Unit>>
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DeclineInvitationHandler(IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor)
        {
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<Unit>> Handle(DeclineInvitationRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_invitationRepository.GetInvitationById(Guid.Parse(request.invitationId)) is not Invitation invitation)
            {
                return CustomErrorOr.CustomErrors.Invitation.InvitationDoesNotExist;
            }
            if(invitation.UserId != Guid.Parse(BearerCheckerResult.Value.Payload.Sub))
            {
                return CustomErrorOr.CustomErrors.Invitation.WrongAccess;
            }

            _invitationRepository.DeleteUserInvitation(invitation);

            return Unit.Value;
        }
    }
}
