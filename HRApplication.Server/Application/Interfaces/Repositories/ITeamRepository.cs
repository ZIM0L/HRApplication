using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamRepository
    {
        void AddNewTeam(Team team);
        Team? GetTeamByName(string name);
        Team? GetTeamById(Guid teamId);
        List<Team>? GetTeamsIdsByName(string name); //TODO : chekc if necessary
        List<Team>? GetTeamsByUserId(List<Guid> teamsId); //TODO : chekc if necessary
        List<Team> GetTeams();
    }
}
