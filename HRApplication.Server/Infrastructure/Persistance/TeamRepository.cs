using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamRepository : ITeamRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddNewTeam(Team team)
        {
            _dbContex.Teams.Add(team);
            _dbContex.SaveChanges();
        }

        public Team? GetTeamById(Guid teamId)
        {
            return _dbContex.Teams.SingleOrDefault(x => x.TeamId.Equals(teamId));
        }

        public Team? GetTeamByName(string name)
        {
            return _dbContex.Teams.FirstOrDefault(x => x.Name.Equals(name));
        }

        public List<Team>? GetTeamsIdsByName(string name)
        {
            return _dbContex.Teams.Where(x => x.Name.Equals(name)).ToList();
        }
    }
}
