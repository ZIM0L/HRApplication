using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamMemberRepository
    {
        void AddNewTeamMemberToCollection(TeamMember teamMember);
        TeamMember? GetTeamMemberFromCollection(TeamMember teamMember);
        List<TeamMember>? GetTeamMembersByUserIdFromCollection(Guid userId);
        List<TeamMember>? GetTeamMembersByTeamIdFromCollection(Guid teamId);
        List<TeamMember>? GetTeamMembersByjobPositionIdFromCollection(Guid jobPositionId);
        List<TeamMember>? GetTeamMembersByTeamIdAndUserId(Guid teamId, Guid userId);
        TeamMember? GetTeamMemberByUserIdAndJobPositionId(Guid jobPositionId, Guid userId);
        void DeleteTeamMembersFromCollection(List<TeamMember> teamMembers);
        void UpdateTeamMembersFromCollection(List<TeamMember> teamMembers);

    }
}
