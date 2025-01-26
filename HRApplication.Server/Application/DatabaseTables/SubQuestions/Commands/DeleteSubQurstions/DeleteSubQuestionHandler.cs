using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.SubQuestions.Commands.DeleteSubQurstions
{
    public class DeleteSubQuestionHandler : IRequestHandler<DeleteSubQuestionRequest, ErrorOr<Unit>>
    {
        private readonly ISubQuestionRepository _subQuestionRepository;
        public DeleteSubQuestionHandler(ISubQuestionRepository subQuestionRepository)
        {
            _subQuestionRepository = subQuestionRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(DeleteSubQuestionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var subQuestions = _subQuestionRepository.GetSubQuestionsByTeamQuestionId(request.teamQuestionId);
            if (subQuestions != null)
            {
                _subQuestionRepository.DeleteSubQuestionsByTeamQuestionIds(subQuestions);
            }
            return Unit.Value;
        }
    }
}
