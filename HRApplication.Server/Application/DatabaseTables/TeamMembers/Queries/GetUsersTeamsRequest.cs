using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries
{
        public record GetUsersTeamsRequest() : IRequest<ErrorOr<List<TeamResultWithUserPermission>>>;
}
