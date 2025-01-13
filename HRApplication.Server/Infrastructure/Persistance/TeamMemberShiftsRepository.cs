using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamMemberShiftsRepository : ITeamMemberShiftsRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamMemberShiftsRepository(DBDatabase dbContex) 
        {
            _dbContex = dbContex;
        }
    }
}
