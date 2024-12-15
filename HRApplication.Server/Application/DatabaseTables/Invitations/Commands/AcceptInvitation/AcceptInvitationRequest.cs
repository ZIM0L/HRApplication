using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.AcceptInvitation
{
    public record AcceptInvitationRequest(string invitaitonId, string jobPositionId) : IRequest<ErrorOr<Unit>>;
}
