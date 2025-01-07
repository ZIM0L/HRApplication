using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents
{
    public record CreateCalendarEventsRequest(Guid teamId,Guid teamsCalendarId, DateTime starDate, DateTime endDate, string title, string description,string location, string category, string permission) : IRequest<ErrorOr<Unit>>;
}
