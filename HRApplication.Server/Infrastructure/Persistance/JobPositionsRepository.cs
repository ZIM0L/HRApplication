using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class JobPositionsRepository : IJobPositionsRepository
    {
        private readonly DBDatabase _dbContex;
        public JobPositionsRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddJobPosition(JobPosition jobPosition)
        {
            _dbContex.Add<JobPosition>(jobPosition);
            _dbContex.SaveChanges();
        }

        public List<JobPosition> GetAllJobPositions()
        {
            return _dbContex.Job_Positions.ToList();
        }

        public JobPosition? GetJobPositionByTitle(string title)
        {
            return _dbContex.Job_Positions.SingleOrDefault(x => x.Title == title);
        }
    }
}
