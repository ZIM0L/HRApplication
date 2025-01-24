using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.AddNewTeamRequest
{
    public record AddNewTeamRequestRequest(string teamId, string title, string requestContent) : IRequest<ErrorOr<TeamRequestsResult>>;
}
