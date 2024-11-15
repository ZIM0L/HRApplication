using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public class AddJobPositionHandler : IRequestHandler<JobPositionRequest, ErrorOr<Unit>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        public AddJobPositionHandler(IUserRepository userRepository, IJobPositionsRepository jobPositionsRepository)
        {
            _jobPositionsRepository = jobPositionsRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(JobPositionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var jobPosition = new JobPosition
                (
                    request.title,
                    request.description
                );

            if (_jobPositionsRepository.GetJobPositionByTitle(jobPosition.Title) is JobPosition)
            {
                return CustomErrorOr.CustomErrors.JobPosition.JobPositionAlreadyExists;
            }

            _jobPositionsRepository.AddJobPosition(jobPosition);

            return Unit.Value;

        }
    }
}
