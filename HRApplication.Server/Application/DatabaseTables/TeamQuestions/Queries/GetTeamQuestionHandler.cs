using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Queries
{
    public class GetTeamQuestionHandler : IRequestHandler<GetTeamQuestionRequest, ErrorOr<List<TeamQuestionResult>?>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamQuestionRepository _teamQuestionRepository;
        private readonly ISubQuestionRepository _subQuestionRepository;

        public GetTeamQuestionHandler(
            ITeamQuestionRepository teamQuestionRepository,
            ITeamMemberRepository teamMemberRepository,
            IHttpContextAccessor httpContextAccessor,
            ISubQuestionRepository subQuestionRepository)
        {
            _teamQuestionRepository = teamQuestionRepository;
            _teamMemberRepository = teamMemberRepository;
            _httpContextAccessor = httpContextAccessor;
            _subQuestionRepository = subQuestionRepository;
        }

        public async Task<ErrorOr<List<TeamQuestionResult>?>> Handle(GetTeamQuestionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var teamId = Guid.Parse(request.teamId);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var userTeamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(teamId, Guid.Parse(BearerCheckerResult.Value.Payload.Sub));
            if (userTeamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }

            var teamQuestions = _teamQuestionRepository.GetTeamQuestionByTeamId(teamId);
            var teamQuestionsIds = teamQuestions!.Select(x => x.TeamQuestionId).ToList();

            var teamSubQuestions = _subQuestionRepository.GetSubQuestionsByTeamQuestionIds(teamQuestionsIds);

            var results = teamQuestions?
                .GroupJoin(
                    teamSubQuestions,
                    teamQuestion => teamQuestion.TeamQuestionId,
                    subQuestion => subQuestion.TeamQuestionId,
                    (teamQuestion, subQuestions) =>
                        new TeamQuestionResult(
                            teamQuestion.TeamQuestionId.ToString(),
                            teamQuestion.Title,
                            teamQuestion.Description,
                            subQuestions
                                .Select(sub => new KeyValuePair<string, string>(sub.SubTitle, sub.SubDescription))
                                .ToList()
                        )
                ).ToList();

            return results;
        }
    }
}
