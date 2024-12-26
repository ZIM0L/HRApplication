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
        public void CreateCalendar(TeamsCalendar teamsCalendar)
        {
            _dbContex.Teams_Calendar.Add(teamsCalendar);
            _dbContex.SaveChanges();
        }
    }
}
