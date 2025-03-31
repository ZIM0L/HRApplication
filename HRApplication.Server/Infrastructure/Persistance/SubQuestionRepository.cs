using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class SubQuestionRepository : ISubQuestionRepository
    {
        private readonly DBDatabase _dbContex;
        public SubQuestionRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddSubQuestions(List<SubQuestion> subQuestions)
        {
            _dbContex.Sub_Questions.AddRange(subQuestions);
            _dbContex.SaveChanges();
        }

        public void DeleteSubQuestionsByTeamQuestions(List<SubQuestion> subQuestions)
        {
            _dbContex.RemoveRange(subQuestions);
            _dbContex.SaveChanges();
        }

        public List<SubQuestion>? GetSubQuestionsByTeamQuestionId(Guid teamQuestionId)
        {
            return _dbContex.Sub_Questions.Where(subQuestion => subQuestion.TeamQuestionId == teamQuestionId).ToList();
        }

        public List<SubQuestion>? GetSubQuestionsByTeamQuestionIds(List<Guid> teamQuestionIds)
        {
            return _dbContex.Sub_Questions
                .Where(subQuestion => teamQuestionIds.Contains(subQuestion.TeamQuestionId))
                .ToList();
        }
    }
}
