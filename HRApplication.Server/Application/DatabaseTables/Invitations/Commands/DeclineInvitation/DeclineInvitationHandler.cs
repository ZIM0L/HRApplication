using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
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

            if(_invitationRepository.GetInvitationById(request.invitation.InvitationId) is not Invitation invitation)
            {
                return CustomErrorOr.CustomErrors.Invitation.InvitationDoesNotExist;
            }

            _invitationRepository.DeleteUserInvitation(invitation);

            return Unit.Value;
        }
    }
}
