using HRApplication.Server.Application.Interfaces.Repositories;
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
    }
}
