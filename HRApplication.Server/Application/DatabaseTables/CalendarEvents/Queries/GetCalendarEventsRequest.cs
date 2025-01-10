using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Queries
{
    public record GetCalendarEventsRequest(string teamId) : IRequest<ErrorOr<List<CalendarEventResult>?>>;
}
