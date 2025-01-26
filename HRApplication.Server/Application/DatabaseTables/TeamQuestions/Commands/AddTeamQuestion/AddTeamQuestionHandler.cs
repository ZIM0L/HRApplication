using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.SubQuestions;
using HRApplication.Server.Application.DatabaseTables.SubQuestions.Commands.AddSubQuestion;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Commands.AddTeamQuestion
{
    public class AddTeamQuestionHandler : IRequestHandler<AddTeamQuestionRequest, ErrorOr<TeamQuestionResult>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamQuestionRepository _teamQuestionRepository;
        private readonly IMediator _mediator;

        public AddTeamQuestionHandler(
            IHttpContextAccessor httpContextAccessor,
            ITeamMemberRepository teamMemberRepository,
            ITeamQuestionRepository teamQuestionRepository,
            IMediator mediator)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamQuestionRepository = teamQuestionRepository;
            _mediator = mediator;
        }

        public async Task<ErrorOr<TeamQuestionResult>> Handle(AddTeamQuestionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamId = Guid.Parse(request.teamId);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);


            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }

            var newTeamQuestion = new TeamQuestion(teamId, request.title, request.description);

            _teamQuestionRepository.AddNewTeamQuestion(newTeamQuestion);
            if (request.subQuestions != null && request.subQuestions.Any())
            {
                var subQuestionsList = request.subQuestions
                    .Select(kv => new SubQuestion(newTeamQuestion.TeamQuestionId, kv.Key, kv.Value))
                    .ToList();

                var subRequests = new AddSubQuestionRequest(newTeamQuestion.TeamQuestionId, request.subQuestions);

                ErrorOr<List<SubQuestion>> response = await _mediator.Send(subRequests);

                if (response.IsError)
                {
                    return response.Errors;
                }
            }

            var result = new TeamQuestionResult(
                newTeamQuestion.TeamQuestionId.ToString(),
                newTeamQuestion.Title,
                newTeamQuestion.Description,
                request.subQuestions?.ToList());

            return result;
        }
    }
}
