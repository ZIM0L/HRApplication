using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamsCalendarRepository
    {
        void CreateTeamCalendar(TeamsCalendar teamsCalendar);
        TeamsCalendar? GetTeamsCalendarByTeamId(Guid teamId);
        TeamsCalendar? GetTeamsCalendarByTeamCalendarId(Guid teamCalendarId);
        void deleteTeamCalendar(TeamsCalendar teamsCalendar);
    }
}
