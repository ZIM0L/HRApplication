using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Enum;
using HRApplication.Server.Domain.Models;
using MediatR;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.UpdateCalenderEvent
{
    public class UpdateCalendarEventHandler : IRequestHandler<UpdateCalendarEventRequest, ErrorOr<CalendarEventResult>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICalendarEventsRepository _calendarEventsRepository;
        private readonly ITeamsCalendarRepository _teamsCalendarRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public UpdateCalendarEventHandler(IHttpContextAccessor httpContextAccessor, ICalendarEventsRepository calendarEventsRepository, ITeamsCalendarRepository teamsCalendarRepository, ITeamMemberRepository teamMemberRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _calendarEventsRepository = calendarEventsRepository;
            _teamsCalendarRepository = teamsCalendarRepository;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<CalendarEventResult>> Handle(UpdateCalendarEventRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;
            var calendarEventId = Guid.Parse(request.calendarEventId);
            var CheckIfTeamTaskIdNull = (string? teamTaskId) =>
            {
                if (string.IsNullOrEmpty(teamTaskId) || teamTaskId == Guid.Empty.ToString())
                {
                    return (Guid?)null;
                }
                return Guid.Parse(teamTaskId);
            };

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var categories = EventType.EventTypeDescriptions.Keys.ToList();
            if (EventType.EventTypeDescriptions.Keys.ToList().Where((eventType) => eventType == request.category) is null)
            {
                return CustomErrorOr.CustomErrors.Calendar.CategoryDoesNotExists;
            }
            var permission = request.permission[0].ToString().ToUpper() + request.permission.Substring(1);
            if (permission != "Administrator" && permission != "Employee")
            {
                return CustomErrorOr.CustomErrors.Calendar.WrongPermission;
            }
            if (_calendarEventsRepository.GetCalendarEvent(calendarEventId) is not CalendarEvent calendarEvent)
            {
                return CustomErrorOr.CustomErrors.Calendar.EventDoesNotExists;
            }
            if (_teamsCalendarRepository.GetTeamsCalendarByTeamCalendarId(calendarEvent.TeamsCalendarId) is not TeamsCalendar teamCalendar)
            {
                return CustomErrorOr.CustomErrors.Calendar.CalendarDoesNotExists;
            }
            if (DateTime.Parse(request.startDate.ToString()) >= DateTime.Parse(request.endDate.ToString()))
            {
                return CustomErrorOr.CustomErrors.Calendar.InvalidaDateProvided;
            }
            var isUserPermittedToAction = IsAdministrator.CheckUser(_teamMemberRepository, teamCalendar.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isUserPermittedToAction.IsError)
            {
                return isUserPermittedToAction.Errors;
            }
            calendarEvent.Permission = permission;
            calendarEvent.StartDate = request.startDate;
            calendarEvent.EndDate = request.endDate;
            calendarEvent.Description = request.description;
            calendarEvent.Category = request.category;
            calendarEvent.Title = request.title;
            calendarEvent.Location = request.location;

            _calendarEventsRepository.UpdateCalendarEvent(calendarEvent);

            return new CalendarEventResult(
                calendarEvent.CalendarEventId,
                calendarEvent.Title,
                calendarEvent.Description,
                calendarEvent.Category,
                calendarEvent.StartDate,
                calendarEvent.EndDate,
                calendarEvent.Permission,
                calendarEvent.Location);
        }
    }
}
