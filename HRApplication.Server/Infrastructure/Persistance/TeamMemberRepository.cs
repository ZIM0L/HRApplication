using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamMemberRepository : ITeamMemberRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamMemberRepository(DBDatabase dbContex)
        { 
            _dbContex = dbContex;
        }
        public void AddNewTeamMemberToCollection(TeamMember teamMember)
        {
            _dbContex.Team_Members.Add(teamMember);
            _dbContex.SaveChanges();
        }

        public List<TeamMember>? GetTeamMembersByUserIdFromCollection(Guid userId)
        {
            return _dbContex.Team_Members.Where(x => x.UserId.Equals(userId)).ToList();
        }

        public TeamMember? GetTeamMemberFromCollection(TeamMember teamMember)
        {
            return _dbContex.Team_Members.SingleOrDefault(x => x.TeamMemberId.Equals(teamMember.TeamMemberId));
        }
    }
}
