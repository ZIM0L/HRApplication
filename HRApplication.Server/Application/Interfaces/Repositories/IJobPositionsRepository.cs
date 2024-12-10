using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface IJobPositionsRepository
    {
        // user needed to check if has permissions
        void AddJobPosition(JobPosition jobPosition);
        JobPosition? GetJobPositionByTitle(string title);
        List<JobPosition>? GetJobPositionsByTeamsId(Guid teamId);
        List<JobPosition> GetAllJobPositions();
        JobPosition? GetJobPositionByTeamIdAndTitle(Guid teamId, string title);
    }
}
