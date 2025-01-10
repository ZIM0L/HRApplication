using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;
using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Queries
{
    public class GetCalendarEventsHandler : IRequestHandler<GetCalendarEventsRequest, ErrorOr<List<CalendarEventResult>?>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICalendarEventsRepository _calendarEventsRepository;
        private readonly ITeamsCalendarRepository _teamsCalendarRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public GetCalendarEventsHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamsCalendarRepository teamsCalendarRepository, ICalendarEventsRepository calendarEventsRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamsCalendarRepository = teamsCalendarRepository;
            _calendarEventsRepository = calendarEventsRepository;
        }
        public async Task<ErrorOr<List<CalendarEventResult>?>> Handle(GetCalendarEventsRequest request, CancellationToken cancellationToken)
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

            if (!userTeamMembers.Any(x => x.TeamId == teamId))
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamId, BearerCheckerResult.Value.Payload.Sub);

            if (_teamsCalendarRepository.GetTeamsCalendarByTeamId(teamId) is not TeamsCalendar teamCalendar)
            {
                return CustomErrorOr.CustomErrors.Calendar.CalendarDoesNotExists;
            }
            var teamCalendarEvents = _calendarEventsRepository.GetCalendarEvents(teamCalendar.TeamsCalendarId);


            if (!isAdminResult.Value)
            {
                teamCalendarEvents = teamCalendarEvents?
                    .Where(x => x.Permission == "Employee")
                    .ToList();
            }

            return teamCalendarEvents?.Select(x => new CalendarEventResult(
                x.CalendarEventId,
                x.Title,
                x.Description,
                x.Category,
                x.StartDate,
                x.EndDate,
                x.Permission,
                x.Location
                )).ToList();
        }
    }
}
