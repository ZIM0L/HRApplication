using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.SubQuestions.Commands.AddSubQuestion
{
    public class AddSubQuestionHandler : IRequestHandler<AddSubQuestionRequest, ErrorOr<List<SubQuestion>>>
    {
        private readonly ISubQuestionRepository _subQuestionRepository;
        public AddSubQuestionHandler(ISubQuestionRepository subQuestionRepository)
        {
            _subQuestionRepository = subQuestionRepository;
        }
        public async Task<ErrorOr<List<SubQuestion>>> Handle(AddSubQuestionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var subQuestions = request.subQuestions.Select(question => new SubQuestion(request.teamQuestionId, question.Key, question.Value)).ToList();

            _subQuestionRepository.AddSubQuestions(subQuestions);

            return subQuestions;
        }
    }
}
