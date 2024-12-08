using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetUsersTeams
{
    public record GetUsersTeamsRequest() : IRequest<ErrorOr<List<TeamResultWithUserPermission>>>;
}
