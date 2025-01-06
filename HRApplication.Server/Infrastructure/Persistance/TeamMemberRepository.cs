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

        public List<TeamMember> GetTeamMembersByTeamIdFromCollection(Guid teamId)
        {
            return _dbContex.Team_Members.Where(x => x.TeamId.Equals(teamId)).ToList();
                           
        }
        public List<TeamMember>? GetTeamMembersByTeamIdAndUserId(Guid teamId, Guid userId)
        {
            return _dbContex.Team_Members.Where(x => x.TeamId == teamId && x.UserId == userId).ToList();
        }

        public void DeleteTeamMembersFromCollection(List<TeamMember> teamMembers)
        {
            _dbContex.Team_Members.RemoveRange(teamMembers);
            _dbContex.SaveChanges();
        }

        public TeamMember? GetTeamMemberByUserIdAndJobPositionId(Guid jobPositionId, Guid userId)
        {
            return _dbContex.Team_Members.SingleOrDefault(x => x.JobPositionId == jobPositionId && x.UserId == userId);
        }
    }
}
