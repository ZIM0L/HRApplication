using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamsCalendarRepository
    {
        TeamsCalendar? GetTeamsCalendarByTeamId(Guid teamId);
        void deleteTeamCalendar(TeamsCalendar teamsCalendar);
    }
}
