using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamsCalendarRepository : ITeamsCalendarRepository
    {
        private readonly DBDatabase _dBContex;
        public TeamsCalendarRepository(DBDatabase dBContex)
        {
            _dBContex = dBContex;
        }

        public void deleteTeamCalendar(TeamsCalendar teamsCalendar)
        {
            _dBContex.Teams_Calendar.Remove(teamsCalendar);
            _dBContex.SaveChanges();
        }

        public TeamsCalendar? GetTeamsCalendarByTeamId(Guid teamId)
        {
            return _dBContex.Teams_Calendar.SingleOrDefault(t => t.TeamId == teamId);
        }
    }
}
