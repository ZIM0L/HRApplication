using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamShiftsRepository : ITeamShiftsRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamShiftsRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }
    }
}
