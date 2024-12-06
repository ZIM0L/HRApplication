using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries
{
    public record TeamResultWithUserPermission(Team team, string roleName);
}
