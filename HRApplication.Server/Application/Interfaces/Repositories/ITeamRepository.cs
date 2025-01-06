using HRApplication.Server.Application.DatabaseTables.Teams.Commands;
using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamRepository
    {
        void AddNewTeam(Team team);
        Team? GetTeamByTeamId(Guid teamId); //TODO : chekc if necessary
        Team? GetTeamByName(string name); //TODO : chekc if necessary
        List<Team>? GetTeamsByUserId(List<Guid> teamsId); //TODO : chekc if necessary
        List<Team> GetTeams();
        void DeleteTeamPermanently(Team team);
        void UpdateTeam(Team updatedTeam);
    }
}
