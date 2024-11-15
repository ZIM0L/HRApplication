using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamRepository
    {
        void AddNewTeam(Team team);
        Team? GetTeamByName(string name);
        Team? GetTeamById(Guid teamId);
        List<Team>? GetTeamsIdsByName(string name);
    }
}
