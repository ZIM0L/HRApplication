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

        public JobPosition? GetJobPositionByTeamIdAndTitle(Guid teamId, string title)
        {
            return _dbContex.Job_Positions.FirstOrDefault(x => x.TeamId == teamId && x.Title == title);
        }

        public JobPosition? GetJobPositionByTitle(string title)
        {
            return _dbContex.Job_Positions.SingleOrDefault(x => x.Title == title);
        }

        public List<JobPosition>? GetJobPositionsByTeamsId(Guid teamId)
        {
            return _dbContex.Job_Positions.Where(x => x.TeamId.Equals(teamId)).ToList(); 
        }
    }
}
