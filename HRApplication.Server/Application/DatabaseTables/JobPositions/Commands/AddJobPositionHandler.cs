using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;


namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public class AddJobPositionHandler : IRequestHandler<JobPositionRequest, ErrorOr<JobPositionsResult>>
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
        public async Task<ErrorOr<JobPositionsResult>> Handle(JobPositionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_teamRepository.GetTeamByTeamId(Guid.Parse(request.teamId.ToLower())) is not Domain.Models.Team)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }
            var UsersteamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(Guid.Parse(request.teamId), Guid.Parse(BearerCheckerResult.Value.Payload.Sub));

            if (UsersteamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            var isUserAdministrator = UsersteamMembers.FirstOrDefault(x => x.RoleName == "Administrator");

            if (isUserAdministrator == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserForbiddenAction;
            }
            var jobPosition = new Domain.Models.JobPosition
                (
                    request.title.ToLower(),
                    request.description,
                    Guid.Parse(request.teamId)
                );

            var jobPositionDTO = new JobPositionsResult
                (
                    jobPosition.JobPositionId,
                    jobPosition.Title,
                    jobPosition.Description,
                    true,
                    jobPosition.IsRecruiting,
                    CreatedDate: jobPosition.CreatedDate,
                    UpdatedDate: null
                );
            if (_jobPositionsRepository.GetJobPositionByTeamIdAndTitle(jobPosition.TeamId, jobPosition.Title) is Domain.Models.JobPosition)
            {
                return CustomErrorOr.CustomErrors.JobPosition.PositionAlreadyInTeam;
            }

             _jobPositionsRepository.AddJobPosition(jobPosition);

            return jobPositionDTO;
        }
    }
}
