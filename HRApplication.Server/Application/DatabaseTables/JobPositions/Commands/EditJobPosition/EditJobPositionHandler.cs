using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands.EditJobPosition
{
    public class EditJobPositionHandler : IRequestHandler<EditJobPositionRequest, ErrorOr<JobPositionsResult>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public EditJobPositionHandler(IJobPositionsRepository jobPositionsRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository)
        {
            _jobPositionsRepository = jobPositionsRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<JobPositionsResult>> Handle(EditJobPositionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var httpContext = _httpContextAccessor.HttpContext;
            
            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if(_jobPositionsRepository.GetJobPositionById(Guid.Parse(request.jobPositionId)) is not Domain.Models.JobPosition jobPosition)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, jobPosition.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            jobPosition.Title = request.title;
            jobPosition.Description = request.description;
            jobPosition.IsActive = request.isActive;
            jobPosition.IsRecruiting = request.isRecruiting;
            jobPosition.UpdatedDate = DateTime.UtcNow;

            _jobPositionsRepository.UpdateJobPosition(jobPosition);

            return new JobPositionsResult(
                jobPosition.JobPositionId,
                jobPosition.Title,
                jobPosition.Description,
                jobPosition.IsActive,
                jobPosition.IsRecruiting,
                jobPosition.CreatedDate,
                jobPosition.UpdatedDate);
        }
    }
}
