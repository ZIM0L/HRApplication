using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;
using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamMemberRequestsRepository : ITeamMemberRequestsRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamMemberRequestsRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddTeamMemberRequest(TeamsMemberRequest teamMemberRequest)
        {
            throw new NotImplementedException();
        }

        public void DeleteTeamMemberRequest(TeamsMemberRequest teamMemberRequest)
        {
            throw new NotImplementedException();
        }

        public TeamsMemberRequest? GetTeamMemberRequestById(Guid teamMemberRequestId)
        {
            throw new NotImplementedException();
        }

        public List<TeamsMemberRequest> GetTeamMemberRequestsByTeamId(Guid teamId)
        {
            return _dbContex.Team_Memebers_Requests.Where(x => x.TeamId == teamId).ToList();
        }

        public List<TeamsMemberRequest>? GetTeamMemberRequestsByUserId(Guid userId)
        {
            return _dbContex.Team_Memebers_Requests.Where(x => x.UserId == userId).ToList();
        }

        public void UpdateTeamMemberRequest(TeamsMemberRequest teamMemberRequest)
        {
            throw new NotImplementedException();
        }
    }
}
