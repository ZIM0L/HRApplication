using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.AcceptInvitation
{
    public record AcceptInvitationRequest(string invitaitonId) : IRequest<ErrorOr<TeamResultWithUserPermission>>;
}
