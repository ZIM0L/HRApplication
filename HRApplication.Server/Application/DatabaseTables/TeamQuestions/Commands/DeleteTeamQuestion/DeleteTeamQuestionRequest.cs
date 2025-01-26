using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Commands.DeleteTeamQuestion
{
    public record DeleteTeamQuestionRequest(string teamQuestionId) : IRequest<ErrorOr<Unit>>;
}
