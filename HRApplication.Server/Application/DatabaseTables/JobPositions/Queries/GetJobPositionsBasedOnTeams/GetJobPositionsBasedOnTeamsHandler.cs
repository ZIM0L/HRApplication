using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.JobPosition.Queries.GetJobPositionsBasedOnTeams;
using HRApplication.Server.Application.DatabaseTables.JobPositions;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;
using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;


namespace HRApplication.Server.Application.DatabaseTable.Queries.GetJobPositionsBasedOnTeams
{
    public class GetJobPositionsBasedOnTeamsHandler : IRequestHandler<GetJobPositionsBasedOnTeamsRequest, ErrorOr<List<JobPositionsResult>>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;

        public GetJobPositionsBasedOnTeamsHandler(IJobPositionsRepository jobPositionsRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository)
        {
            _jobPositionsRepository = jobPositionsRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<List<JobPositionsResult>>> Handle(GetJobPositionsBasedOnTeamsRequest query, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var jobPositions = _jobPositionsRepository.GetJobPositionsByTeamsId(Guid.Parse(query.teamId));

            if (jobPositions is null)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }
         
            //TODO: maybe mappster
            var result = jobPositions.Select(job => new JobPositionsResult
               (
                   job.JobPositionId,
                   job.Title,
                   job.Description,
                   job.IsActive,
                   job.IsRecruiting,
                   job.CreatedDate,
                   job.UpdatedDate
               )).ToList();

            return result;

        }
    }
}
