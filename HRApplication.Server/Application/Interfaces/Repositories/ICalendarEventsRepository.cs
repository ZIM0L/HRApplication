using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ICalendarEventsRepository
    {
        CalendarEvent? GetCalendarEvent(Guid calendarEventId);
        void UpdateCalendarEvent(CalendarEvent calendarEvent);
        void CreateCalendarEvent(CalendarEvent calendarEvent);
        List<CalendarEvent>? GetCalendarEvents(Guid teamsCalendarId);
        void DeleteCalendarEvent(CalendarEvent calendarEventId);
    }
}
