using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamQuestionRepository : ITeamQuestionRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamQuestionRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddNewTeamQuestion(TeamQuestion teamQuestion)
        {
            _dbContex.Team_Questions.Add(teamQuestion); 
            _dbContex.SaveChanges();
        }

        public void DeleteTeamQuestion(TeamQuestion teamQuestion)
        {
           _dbContex.Team_Questions.Remove(teamQuestion);
           _dbContex.SaveChanges();
        }

        public void DeleteTeamQuestions(List<TeamQuestion> teamQuestion)
        {
            _dbContex.Team_Questions.RemoveRange(teamQuestion);
            _dbContex.SaveChanges();
        }

        public List<TeamQuestion>? GetTeamQuestionByTeamId(Guid teamId)
        {
            return _dbContex.Team_Questions.Where(x => x.TeamId == teamId).ToList();
        }

        public TeamQuestion? GetTeamQuestionByteamQuestionId(Guid teamQuestionId)
        {
            return _dbContex.Team_Questions.SingleOrDefault(x => x.TeamQuestionId == teamQuestionId);
        }
    }
}
