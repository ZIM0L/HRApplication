using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamsCalendarRepository : ITeamsCalendarRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamsCalendarRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void CreateTeamCalendar(TeamsCalendar teamsCalendar)
        {
            _dbContex.Teams_Calendar.Add(teamsCalendar);
            _dbContex.SaveChanges();
        }

        public void deleteTeamCalendar(TeamsCalendar teamsCalendar)
        {
            _dbContex.Teams_Calendar.Remove(teamsCalendar);
            _dbContex.SaveChanges();
        }

        public TeamsCalendar? GetTeamsCalendarByTeamCalendarId(Guid teamCalendarId)
        {
            return _dbContex.Teams_Calendar.SingleOrDefault(t => t.TeamsCalendarId == teamCalendarId);
        }

        public TeamsCalendar? GetTeamsCalendarByTeamId(Guid teamId)
        {
            return _dbContex.Teams_Calendar.SingleOrDefault(t => t.TeamId == teamId);
        }
    }
}
