using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.SubQuestions.Commands.DeleteSubQurstions
{
    public record DeleteSubQuestionRequest(Guid teamQuestionId) : IRequest<ErrorOr<Unit>>;
}
