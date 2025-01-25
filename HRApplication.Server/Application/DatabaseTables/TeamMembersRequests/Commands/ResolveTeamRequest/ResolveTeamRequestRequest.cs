using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.ResolveTeamRequest
{
    public record ResolveTeamRequestRequest(string teamMemberRequestId) : IRequest<ErrorOr<Unit>>;

}
