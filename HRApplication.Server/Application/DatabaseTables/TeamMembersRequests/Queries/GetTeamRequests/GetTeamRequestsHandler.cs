using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Queries.GetTeamRequests
{
    public class GetTeamRequestsHandler : IRequestHandler<GetTeamRequestsRequest, ErrorOr<List<TeamRequestsResult>?>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamMemberRequestsRepository _teamRequestsRepository;
        public GetTeamRequestsHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamMemberRequestsRepository teamRequestsRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRequestsRepository = teamRequestsRepository;
        }
        public async Task<ErrorOr<List<TeamRequestsResult>?>> Handle(GetTeamRequestsRequest request, CancellationToken cancellationToken)
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
            var isUserAdministrator = userTeamMembers.FirstOrDefault(x => x.RoleName == "Administrator");

            if (isUserAdministrator != null)
            {
                return _teamRequestsRepository?.GetTeamMemberRequestsByTeamId(teamId)?
                    .Select(request => new TeamRequestsResult(
                        request.TeamsMembersRequestId,
                        request.Title,
                        request.RequestContent,
                        request.Status)).ToList();
            }
            var userRequests = _teamRequestsRepository.GetTeamMemberRequestsByUserId(Guid.Parse(BearerCheckerResult.Value.Payload.Sub));
            return userRequests?.Select(request => new TeamRequestsResult(request.TeamsMembersRequestId, request.Title, request.RequestContent, request.Status)).ToList();
        }
    }
}
