using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public class AddJobPositionHandler : IRequestHandler<JobPositionRequest, ErrorOr<Unit>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public AddJobPositionHandler(IUserRepository userRepository, IJobPositionsRepository jobPositionsRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository)
        {
            _jobPositionsRepository = jobPositionsRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(JobPositionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            //if (_teamMemberRepository.GetTeamMemberByUserIdFromCollection(Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is not TeamMember teamMember)
            //{
            //    return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            //}

            //var jobPosition = new JobPosition
            //    (
            //        request.title.ToLower(),
            //        request.description,
            //        teamMember.TeamId
            //    );

            // pozniej sprawdz
            //var TeamsJobPositions = _jobPositionsRepository.GetJobPositionsByTeamsId(jobPosition.TeamId);

            //if (TeamsJobPositions == null)
            //{
            //    return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            //}
            //{
            //    if (TeamsJobPositions.Any(jobPositions => jobPositions.Title.Equals(request.title, StringComparison.OrdinalIgnoreCase)))
            //    {
            //        return CustomErrorOr.CustomErrors.JobPosition.JobPositionAlreadyExists;
            //    }

            //    _jobPositionsRepository.AddJobPosition(jobPosition);

            //    return Unit.Value;

            //}
            return Unit.Value;
        }
    }
}
