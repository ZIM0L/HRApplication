using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Queries.GetTeamRequests
{
    public record GetTeamRequestsRequest(string teamId) : IRequest<ErrorOr<List<TeamRequestsResult>?>>;
}
