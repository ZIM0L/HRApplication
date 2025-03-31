using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ISubQuestionRepository
    {
        void AddSubQuestions(List<SubQuestion> subQuestions);
        List<SubQuestion>? GetSubQuestionsByTeamQuestionIds(List<Guid> teamQuestionIds);
        void DeleteSubQuestionsByTeamQuestions(List<SubQuestion> subQuestions);
        List<SubQuestion>? GetSubQuestionsByTeamQuestionId( Guid teamQuestionId);
    }
}
