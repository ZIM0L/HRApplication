using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class CalendarEventsRepository : ICalendarEventsRepository
    {
        private readonly DBDatabase _dbContex;
        public CalendarEventsRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }
        public void CreateCalendarEvent(CalendarEvent calendarEvent)
        {
            _dbContex.Calendar_Events.Add(calendarEvent);
            _dbContex.SaveChanges();
        }

        public void DeleteCalendarEvent(CalendarEvent calendarEventId)
        {
            _dbContex.Calendar_Events.Remove(calendarEventId);
            _dbContex.SaveChanges();
        }

        public CalendarEvent? GetCalendarEvent(Guid calendarEventId)
        {
            return _dbContex.Calendar_Events.SingleOrDefault(x => x.CalendarEventId == calendarEventId);
        }

        public List<CalendarEvent>? GetCalendarEvents(Guid teamsCalendarId)
        {
            return _dbContex.Calendar_Events.Where(x => x.TeamsCalendarId == teamsCalendarId).ToList();
        }

        public void UpdateCalendarEvent(CalendarEvent calendarEvent)
        {
            _dbContex.Calendar_Events.Update(calendarEvent);
            _dbContex.SaveChanges();
        }
    }
}
