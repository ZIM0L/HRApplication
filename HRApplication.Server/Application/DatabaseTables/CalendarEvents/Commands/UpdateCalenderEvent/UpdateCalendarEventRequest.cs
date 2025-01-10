using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.UpdateCalenderEvent
{
    public record UpdateCalendarEventRequest(string calendarEventId, DateTime startDate, DateTime endDate, string title, string description, string? location , string category, string permission, string? teamTaskId = null) : IRequest<ErrorOr<CalendarEventResult>>;
}
