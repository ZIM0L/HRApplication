using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;
using Microsoft.AspNetCore.Http;
using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Queries
{
    public class GetJobPositionsBasedOnTeamsHandler : IRequestHandler<GetJobPositionsRequest, ErrorOr<List<JobPositionsResult>>>
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
        public async Task<ErrorOr<List<JobPositionsResult>>> Handle(GetJobPositionsRequest query, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_teamMemberRepository.GetTeamMembersByUserIdFromCollection(Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is not List<TeamMember> teamMember)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }

            var TeamsJobPositions = _jobPositionsRepository.GetJobPositionsByTeamsId(teamMember[1].TeamId); //temporary

            if (TeamsJobPositions == null)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            //TODO: maybe mappster
            var result = TeamsJobPositions.Select(job => new JobPositionsResult
               (
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
