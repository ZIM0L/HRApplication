using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ICalendarEventsRepository
    {
        void CreateCalendar(TeamsCalendar teamsCalendar);
    }
}
