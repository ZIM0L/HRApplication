using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands.DisbandTeam
{
    public class DisbandTeamHandler : IRequestHandler<DisbandTeamRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamRepository _teamRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamsCalendarRepository _teamsCalendarRepository;
        private readonly IJobPositionsRepository _jobPositionsRepository;
        //calendarEvents add later
        //TeamMebmberTask add later
        //teamTask add later
        //teamquestions add later 
        //teamMemberRequest add later
        public DisbandTeamHandler(ITeamRepository teamRepository, ITeamMemberRepository teamMemberRepository, ITeamsCalendarRepository teamsCalendarRepository, IJobPositionsRepository jobPositionsRepository, IHttpContextAccessor httpContextAccessor)
        {
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _teamsCalendarRepository = teamsCalendarRepository;
            _jobPositionsRepository = jobPositionsRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<Unit>> Handle(DisbandTeamRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamId = Guid.Parse(request.teamId);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_teamMemberRepository.GetTeamMemberByTeamIdAndUserId(teamId, Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is not TeamMember administratorTeamMember)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            if (administratorTeamMember.RoleName != "Administrator")
            {
                return CustomErrorOr.CustomErrors.Team.UserForbiddenAction;
            }
            var teamMembers = _teamMemberRepository.GetTeamMembersByTeamIdFromCollection(teamId);

            _teamMemberRepository.DeleteTeamMembersFromCollection(teamMembers);

            var jobPositions = _jobPositionsRepository.GetJobPositionsByTeamsId(teamId);

            if (jobPositions != null)
            {
                _jobPositionsRepository.DeleteAllJobPositions(jobPositions);
            }

            var teamCalendar = _teamsCalendarRepository.GetTeamsCalendarByTeamId(teamId);

            if (teamCalendar != null)
            {
                _teamsCalendarRepository.deleteTeamCalendar(teamCalendar);
            }
            var team = _teamRepository.GetTeamByTeamId(teamId);
            if (team != null)
            {
                _teamRepository.DeleteTeamPermanently(team);
            }
            return Unit.Value;
        }
    }
}
