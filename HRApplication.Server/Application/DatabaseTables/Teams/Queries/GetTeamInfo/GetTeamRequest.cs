using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Queries.GetTeamInfo
{
    public record GetTeamRequest(string teamId) : IRequest<ErrorOr<TeamResult>>;
}
