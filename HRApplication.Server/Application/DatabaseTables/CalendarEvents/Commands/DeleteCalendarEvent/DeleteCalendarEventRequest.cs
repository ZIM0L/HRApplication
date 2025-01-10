using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.DeleteCalendarEvent
{
    public record DeleteCalendarEventRequest(string calendareventid) : IRequest<ErrorOr<Unit>>;
}
