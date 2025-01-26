using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Queries
{
    public record GetTeamQuestionRequest(string teamId) : IRequest<ErrorOr<List<TeamQuestionResult>?>>;
}
