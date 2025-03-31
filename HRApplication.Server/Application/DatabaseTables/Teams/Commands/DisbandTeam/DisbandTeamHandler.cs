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
        private readonly ICalendarEventsRepository _calendarEventsRepository;
        private readonly ITeamMemberRequestsRepository _teamMemberRequestsRepository;
        private readonly ITeamQuestionRepository _teamQuestionRepository;
        private readonly ITeamShiftsRepository _teamShiftsRepository;
        private readonly ITeamMemberShiftsRepository _teamMemberShiftsRepository;
        private readonly IInvitationRepository _invitationRepository;
        private readonly ISubQuestionRepository _subQuestionRepository;
        //TeamMebmberTask add later
        //teamTask add later
        //teamquestions add later 
        //teamMemberRequest add later
        public DisbandTeamHandler(ITeamRepository teamRepository, ITeamMemberRepository teamMemberRepository, ITeamsCalendarRepository teamsCalendarRepository, IJobPositionsRepository jobPositionsRepository, IHttpContextAccessor httpContextAccessor, ICalendarEventsRepository calendarEventsRepository, ITeamMemberRequestsRepository teamMemberRequestsRepository, ITeamQuestionRepository teamQuestionRepository, ITeamShiftsRepository teamShiftsRepository, IInvitationRepository invitationRepository, ITeamMemberShiftsRepository teamMemberShiftsRepository, ISubQuestionRepository subQuestionRepository)
        {
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _teamsCalendarRepository = teamsCalendarRepository;
            _jobPositionsRepository = jobPositionsRepository;
            _httpContextAccessor = httpContextAccessor;
            _calendarEventsRepository = calendarEventsRepository;
            _teamMemberRequestsRepository = teamMemberRequestsRepository;
            _teamQuestionRepository = teamQuestionRepository;
            _teamShiftsRepository = teamShiftsRepository;
            _invitationRepository = invitationRepository;
            _teamMemberShiftsRepository = teamMemberShiftsRepository;
            _subQuestionRepository = subQuestionRepository;
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

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }

            //teamMembers
            var teamTeamMembers = _teamMemberRepository.GetTeamMembersByTeamIdFromCollection(teamId);


            _teamMemberRepository.DeleteTeamMembersFromCollection(teamTeamMembers!);

            //jobpositions
            var jobPositions = _jobPositionsRepository.GetJobPositionsByTeamsId(teamId);

            if (jobPositions != null)
            {
                //invitations
                var invitations = _invitationRepository.GetInvitatiosnByJobPositionIds(jobPositions.Select(jp => jp.JobPositionId).ToList());
                if (invitations != null)
                {
                    _invitationRepository.DeleteInvitations(invitations);
                }
                _jobPositionsRepository.DeleteAllJobPositions(jobPositions);
            }


            //calendar
            var teamCalendar = _teamsCalendarRepository.GetTeamsCalendarByTeamId(teamId);
            if (teamCalendar != null)
            {
                //events
                var events = _calendarEventsRepository.GetCalendarEvents(teamCalendar.TeamsCalendarId);
                if (events != null)
                {
                    _calendarEventsRepository.DeleteCalendarEvents(events);
                }

                _teamsCalendarRepository.deleteTeamCalendar(teamCalendar);
            }
            //teamQuestions
            var teamQuestions = _teamQuestionRepository.GetTeamQuestionByTeamId(teamId);
            if (teamQuestions != null) {
                //suquestions
                var subQuestions = _subQuestionRepository.GetSubQuestionsByTeamQuestionIds(teamQuestions.Select(tq => tq.TeamQuestionId).ToList());
                if (subQuestions != null)
                {
                    _subQuestionRepository.DeleteSubQuestionsByTeamQuestions(subQuestions);
                }
                _teamQuestionRepository.DeleteTeamQuestions(teamQuestions);
            }
            //teamMemberRequests
            var teamMemberRequests = _teamMemberRequestsRepository.GetTeamMemberRequestsByTeamId(teamId);
            if (teamMemberRequests != null)
            {
                _teamMemberRequestsRepository.DeleteTeamMemberRequests(teamMemberRequests);
            }
            //teamShifts
            var teamShifts = _teamShiftsRepository.GetTeamShiftsByTeamId(teamId);
            if (teamShifts != null)
            {
                //teamMemberShifts
                var teamShiftMembers = _teamMemberShiftsRepository.GetTeamMemberShiftsByTeamShiftsIds(teamShifts.Select(ts => ts.TeamShiftId).ToList());
                if (teamShiftMembers != null)
                {
                    _teamMemberShiftsRepository.DeleteTeamMemberShfits(teamShiftMembers);
                }
                _teamShiftsRepository.DeleteTeamShifts(teamShifts);
            }

            //team
            var team = _teamRepository.GetTeamByTeamId(teamId);
            if (team != null)
            {
                _teamRepository.DeleteTeamPermanently(team);
            }
            return Unit.Value;
        }
    }
}
