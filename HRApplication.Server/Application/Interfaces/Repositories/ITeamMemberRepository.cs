using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamMemberRepository
    {
        void AddNewTeamMemberToCollection(TeamMember teamMember);
        TeamMember? GetTeamMemberFromCollection(TeamMember teamMember);
        List<TeamMember>? GetTeamMembersByUserIdFromCollection(Guid userId);
    }
}
