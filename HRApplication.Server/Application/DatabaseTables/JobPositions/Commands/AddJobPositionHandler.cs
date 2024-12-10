using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;


namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public class AddJobPositionHandler : IRequestHandler<JobPositionRequest, ErrorOr<Unit>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        public AddJobPositionHandler(IUserRepository userRepository, IJobPositionsRepository jobPositionsRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamRepository teamRepository)
        {
            _jobPositionsRepository = jobPositionsRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRepository = teamRepository;
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

            if (_teamRepository.GetTeamByTeamId(Guid.Parse(request.teamId.ToLower())) is not Team)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }
            if (_teamMemberRepository.GetTeamMemberByTeamIdAndUserId(Guid.Parse(request.teamId.ToLower()), Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is not TeamMember)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }

            var jobPosition = new Domain.Models.JobPosition
                (
                    request.title.ToLower(),
                    request.description,
                    Guid.Parse(request.teamId)
                );

            if(_jobPositionsRepository.GetJobPositionByTeamIdAndTitle(jobPosition.TeamId, jobPosition.Title) is Domain.Models.JobPosition)
            {
                return CustomErrorOr.CustomErrors.JobPosition.PositionAlreadyInTeam;
            }

             _jobPositionsRepository.AddJobPosition(jobPosition);

            return Unit.Value;
        }
    }
}
