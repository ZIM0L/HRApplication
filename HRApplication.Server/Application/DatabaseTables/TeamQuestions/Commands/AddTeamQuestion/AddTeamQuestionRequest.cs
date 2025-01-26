using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Commands.AddTeamQuestion
{
    public record AddTeamQuestionRequest(string teamId, string title, string description, List<KeyValuePair<string, string>>? subQuestions) : IRequest<ErrorOr<TeamQuestionResult>>;
}
