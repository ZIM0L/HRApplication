using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Queries
{
    public class GetJobPositionsHandler : IRequestHandler<GetJobPositionsQuery, ErrorOr<List<JobPositionsResult>>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        public GetJobPositionsHandler(IJobPositionsRepository jobPositionsRepository)
        {
            _jobPositionsRepository = jobPositionsRepository;
        }
        public async Task<ErrorOr<List<JobPositionsResult>>> Handle(GetJobPositionsQuery query, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var jobPositions = _jobPositionsRepository.GetAllJobPositions();

            if (jobPositions == null)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }
            //TODO: maybe mappster
            var result = jobPositions.Select(job => new JobPositionsResult
               (
                   job.Title,
                   job.Description,
                   job.IsActive,
                   job.CreatedDate,
                   job.UpdatedDate
               )).ToList();
                
            return result;

        }
    }
}
