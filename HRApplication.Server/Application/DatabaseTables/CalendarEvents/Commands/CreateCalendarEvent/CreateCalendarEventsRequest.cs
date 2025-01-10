using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.CreateCalendarEvents
{
    public record CreateCalendarEventsRequest(string teamId, DateTime startDate, DateTime endDate, string title, string description, string? location, string category, string permission, string? teamTaskId = null) : IRequest<ErrorOr<CalendarEventResult>>;
}
