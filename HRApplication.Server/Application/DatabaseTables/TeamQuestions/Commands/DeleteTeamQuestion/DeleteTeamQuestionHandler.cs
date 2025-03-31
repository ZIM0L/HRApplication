using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.SubQuestions.Commands.AddSubQuestion;
using HRApplication.Server.Application.DatabaseTables.SubQuestions.Commands.DeleteSubQurstions;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Commands.DeleteTeamQuestion
{
    public class DeleteTeamQuestionHandler : IRequestHandler<DeleteTeamQuestionRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamQuestionRepository _teamQuestionRepository;
        private readonly IMediator _mediator;
        public DeleteTeamQuestionHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamQuestionRepository teamQuestionRepository, IMediator mediator)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamQuestionRepository = teamQuestionRepository;
            _mediator = mediator;
        }
        public async Task<ErrorOr<Unit>> Handle(DeleteTeamQuestionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if(_teamQuestionRepository.GetTeamQuestionByteamQuestionId(Guid.Parse(request.teamQuestionId)) is not TeamQuestion teamQuestion)
            {
                return CustomErrorOr.CustomErrors.Questions.QuestionsDoesnotExists;
            }
            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamQuestion.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }

            var subRequests = new DeleteSubQuestionRequest(teamQuestion.TeamQuestionId);

            ErrorOr<Unit> response = await _mediator.Send(subRequests);
            if (response.IsError)
            {
               return response.Errors;
            }

            _teamQuestionRepository.DeleteTeamQuestion(teamQuestion);

            return Unit.Value;
        }
    }
}
