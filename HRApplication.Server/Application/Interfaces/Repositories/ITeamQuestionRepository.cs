using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamQuestionRepository
    {
        void AddNewTeamQuestion(TeamQuestion teamQuestion);
        List<TeamQuestion>? GetTeamQuestionByTeamId(Guid teamId);
        TeamQuestion? GetTeamQuestionByteamQuestionId(Guid teamQuestionId);
        void DeleteTeamQuestion(TeamQuestion teamQuestion);
        void DeleteTeamQuestions(List<TeamQuestion> teamQuestion);
    }
}
