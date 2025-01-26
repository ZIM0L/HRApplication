using ErrorOr;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.SubQuestions.Commands.AddSubQuestion
{
    public record AddSubQuestionRequest(Guid teamQuestionId, List<KeyValuePair<string, string>> subQuestions) : IRequest<ErrorOr<List<SubQuestion>>>;
}
