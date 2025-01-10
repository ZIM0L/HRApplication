using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Enum;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.CreateCalendarEvents
{
    public class CreateCalendarEventsHandler : IRequestHandler<CreateCalendarEventsRequest, ErrorOr<CalendarEventResult>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICalendarEventsRepository _calendarEventsRepository;
        private readonly ITeamsCalendarRepository _teamsCalendarRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public CreateCalendarEventsHandler(IHttpContextAccessor httpContextAccessor, ICalendarEventsRepository calendarEventsRepository, ITeamsCalendarRepository teamsCalendarRepository, ITeamMemberRepository teamMemberRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _calendarEventsRepository = calendarEventsRepository;
            _teamsCalendarRepository = teamsCalendarRepository;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<CalendarEventResult>> Handle(CreateCalendarEventsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;
            var teamId = Guid.Parse(request.teamId);
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

            var isUserPermittedToAction = IsAdministrator.CheckUser(_teamMemberRepository, teamId, BearerCheckerResult.Value.Payload.Sub);
            if (isUserPermittedToAction.IsError)
            {
                return isUserPermittedToAction.Errors;
            }
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
            if(_teamsCalendarRepository.GetTeamsCalendarByTeamId(teamId) is not TeamsCalendar teamCalendar)
            {
                return CustomErrorOr.CustomErrors.Calendar.CalendarDoesNotExists;
            }
            
            Guid? teamTaskId = CheckIfTeamTaskIdNull(request.teamTaskId);

            var calendarEvent = new CalendarEvent(
                teamCalendar.TeamsCalendarId,
                request.title,
                request.description,
                request.category,
                request.startDate,
                request.endDate,
                request.permission,
                request.location,
                teamTaskId);

            _calendarEventsRepository.CreateCalendarEvent(calendarEvent);

            var calendarEventResult = new CalendarEventResult(
                calendarEvent.CalendarEventId,
                calendarEvent.Title,
                calendarEvent.Description,
                calendarEvent.Category,
                calendarEvent.StartDate,
                calendarEvent.EndDate,
                calendarEvent.Permission,
                calendarEvent.Location
                );

            //teamtaskid later
            return calendarEventResult;
        }
    }
}
