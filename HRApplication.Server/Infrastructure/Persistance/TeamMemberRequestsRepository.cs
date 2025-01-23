using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamMemberRequestsRepository : ITeamMemberRequestsRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamMemberRequestsRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddTeamMemberRequest(TeamMemberRequest teamMemberRequest)
        {
            _dbContex.Team_Members_Requests.Add(teamMemberRequest);
            _dbContex.SaveChanges();
        }

        public void DeleteTeamMemberRequest(TeamMemberRequest teamMemberRequest)
        {
            _dbContex.Team_Members_Requests.Remove(teamMemberRequest);
            _dbContex.SaveChanges();
        }

        public TeamMemberRequest? GetTeamMemberRequestById(Guid teamMemberRequestId)
        {
            return _dbContex.Team_Members_Requests.SingleOrDefault(x => x.TeamMemberRequestId == teamMemberRequestId);
        }

        public List<TeamMemberRequest> GetTeamMemberRequestsByTeamId(Guid teamId)
        {
            return _dbContex.Team_Members_Requests.Where(x => x.TeamId == teamId).ToList();
        }

        public List<TeamMemberRequest>? GetTeamMemberRequestsByUserId(Guid userId)
        {
            return _dbContex.Team_Members_Requests.Where(x => x.UserId == userId).ToList();
        }

        public List<TeamMemberRequest>? GetTeamMemberRequestsByUserIdAndTeamId(Guid userId, Guid teamId)
        {
            return _dbContex.Team_Members_Requests.Where(x => x.UserId == userId && x.TeamId == teamId).ToList();
        }

        public void UpdateTeamMemberRequest(TeamMemberRequest teamMemberRequest)
        {
            _dbContex.Team_Members_Requests.Update(teamMemberRequest);
            _dbContex.SaveChanges();
        }
    }
}
