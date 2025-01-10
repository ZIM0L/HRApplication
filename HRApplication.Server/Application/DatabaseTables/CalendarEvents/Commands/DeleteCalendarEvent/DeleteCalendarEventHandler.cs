using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.DeleteCalendarEvent
{
    public class DeleteCalendarEventHandler : IRequestHandler<DeleteCalendarEventRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICalendarEventsRepository _calendarEventsRepository;
        private readonly ITeamsCalendarRepository _teamsCalendarRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public DeleteCalendarEventHandler(IHttpContextAccessor httpContextAccessor, ICalendarEventsRepository calendarEventsRepository, ITeamsCalendarRepository teamsCalendarRepository, ITeamMemberRepository teamMemberRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _calendarEventsRepository = calendarEventsRepository;
            _teamsCalendarRepository = teamsCalendarRepository;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(DeleteCalendarEventRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var calendarEventId = Guid.Parse(request.calendareventid);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);
            if(_calendarEventsRepository.GetCalendarEvent(calendarEventId) is not CalendarEvent calendarEvent)
            {
                return CustomErrorOr.CustomErrors.Calendar.EventDoesNotExists;
            }
            if (_teamsCalendarRepository.GetTeamsCalendarByTeamCalendarId(calendarEvent.TeamsCalendarId) is not TeamsCalendar teamCalendar)
            {
                return CustomErrorOr.CustomErrors.Calendar.CalendarDoesNotExists;
            }
            var isUserPermittedToAction = IsAdministrator.CheckUser(_teamMemberRepository, teamCalendar.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isUserPermittedToAction.IsError)
            {
                return isUserPermittedToAction.Errors;
            }

            _calendarEventsRepository.DeleteCalendarEvent(calendarEvent);

            return Unit.Value;
        }
    }
}
