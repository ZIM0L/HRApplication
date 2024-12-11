using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.DeclineInvitation
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
            

            return Unit.Value;
        }
    }
}
