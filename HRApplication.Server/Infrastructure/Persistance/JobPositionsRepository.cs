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
            _dbContex.Job_Positions.Add(jobPosition);
            _dbContex.SaveChanges();
        }

        public void DeleteAllJobPositions(List<JobPosition> jobPosition)
        {
            _dbContex.Job_Positions.RemoveRange(jobPosition);
            _dbContex.SaveChanges();
        }

        public void DeleteJobPosition(JobPosition jobPosition)
        {
            _dbContex.Job_Positions.Remove(jobPosition);
            _dbContex.SaveChanges();
        }

        public List<JobPosition> GetAllJobPositions()
        {
            return _dbContex.Job_Positions.ToList();
        }

        public JobPosition? GetJobPositionById(Guid jobPositionId)
        {
            return _dbContex.Job_Positions.SingleOrDefault(x => x.JobPositionId == jobPositionId);
        }

        public JobPosition? GetJobPositionByTeamIdAndTitle(Guid teamId, string title)
        {
            return _dbContex.Job_Positions.SingleOrDefault(x => x.TeamId == teamId && x.Title == title);
        }

        public JobPosition? GetJobPositionByTitle(string title)
        {
            return _dbContex.Job_Positions.SingleOrDefault(x => x.Title == title);
        }

        public List<JobPosition>? GetJobPositionsByIds(List<Guid> jobPositionId)
        {
            return _dbContex.Job_Positions.Where(x => jobPositionId.Contains(x.JobPositionId)).ToList();
        }

        public List<JobPosition>? GetJobPositionsByTeamsId(Guid teamId)
        {
            return _dbContex.Job_Positions.Where(x => x.TeamId.Equals(teamId)).ToList(); 
        }

        public void UpdateJobPosition(JobPosition jobPosition)
        {
            _dbContex.Job_Positions.Update(jobPosition);
            _dbContex.SaveChanges();
        }
    }
}
