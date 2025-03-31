using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamMemberRequestsRepository
    {
        List<TeamMemberRequest>? GetTeamMemberRequestsByTeamId(Guid teamId);
        List<TeamMemberRequest>? GetTeamMemberRequestsByUserId(Guid userId);
        List<TeamMemberRequest>? GetTeamMemberRequestsByUserIdAndTeamId(Guid userId, Guid teamId);
        void AddTeamMemberRequest(TeamMemberRequest teamMemberRequest);
        void DeleteTeamMemberRequest(TeamMemberRequest teamMemberRequest);
        TeamMemberRequest? GetTeamMemberRequestById(Guid teamMemberRequestId);
        void UpdateTeamMemberRequest(TeamMemberRequest teamMemberRequest);
        void DeleteTeamMemberRequests(List<TeamMemberRequest> teamMemberRequests);

    }
}
