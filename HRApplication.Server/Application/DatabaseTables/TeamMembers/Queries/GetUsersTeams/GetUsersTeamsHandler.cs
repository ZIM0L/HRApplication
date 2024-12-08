using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetUsersTeams
{
    public class GetUsersTeamsHandler : IRequestHandler<GetUsersTeamsRequest, ErrorOr<List<TeamResultWithUserPermission>>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMediator _mediator;

        public GetUsersTeamsHandler(ITeamMemberRepository teamMemberRepository, ITeamRepository teamRepository, IHttpContextAccessor httpContextAccessor, IMediator mediator)
        {
            _teamMemberRepository = teamMemberRepository;
            _teamRepository = teamRepository;
            _httpContextAccessor = httpContextAccessor;
            _mediator = mediator;
        }

        public async Task<ErrorOr<List<TeamResultWithUserPermission>>> Handle(GetUsersTeamsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var UsersTeams = _teamMemberRepository.GetTeamMembersByUserIdFromCollection(Guid.Parse(BearerCheckerResult.Value.Payload.Sub));

            if (UsersTeams is null)
            {
                return CustomErrorOr.CustomErrors.Team.UserWithoutTeam;
            }

            var teamsIds = UsersTeams.Select(x => x.TeamId).ToList();

            var teams = _teamRepository.GetTeamsByUserId(teamsIds);

            if (teams is null)
            {
                return CustomErrorOr.CustomErrors.Team.UserWithoutTeam;
            }
            return teams.Select(team =>
            {
                var userTeam = UsersTeams.FirstOrDefault(ut => ut.TeamId == team.TeamId);
                return new TeamResultWithUserPermission(
                    team,
                    userTeam?.RoleName ?? ""
                );
            }).ToList();

        }
    }
}
