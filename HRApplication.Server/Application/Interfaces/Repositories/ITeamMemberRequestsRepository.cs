using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamMemberRequestsRepository
    {
        List<TeamsMemberRequest>? GetTeamMemberRequestsByTeamId(Guid teamId);
        List<TeamsMemberRequest>? GetTeamMemberRequestsByUserId(Guid userId);
        void AddTeamMemberRequest(TeamsMemberRequest teamMemberRequest);
        void DeleteTeamMemberRequest(TeamsMemberRequest teamMemberRequest);
        TeamsMemberRequest? GetTeamMemberRequestById(Guid teamMemberRequestId);
        void UpdateTeamMemberRequest(TeamsMemberRequest teamMemberRequest);

    }
}
