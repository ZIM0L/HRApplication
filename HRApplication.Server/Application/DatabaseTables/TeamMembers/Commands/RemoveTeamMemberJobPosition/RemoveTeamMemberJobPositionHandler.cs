using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.RemoveTeamMemberJobPosition
{
    public class RemoveTeamMemberJobPositionHandler : IRequestHandler<RemoveTeamMemberJobPositionRequest, ErrorOr<Unit>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        public RemoveTeamMemberJobPositionHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, IJobPositionsRepository jobPositionsRepository, IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _jobPositionsRepository = jobPositionsRepository;
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<Unit>> Handle(RemoveTeamMemberJobPositionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, Guid.Parse(request.teamId), BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            var UserTeamMemberToModify = _userRepository.GetUserByEmail(request.email);
            if (UserTeamMemberToModify == null)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }
            var usersTeamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(Guid.Parse(request.teamId), UserTeamMemberToModify.UserId);
            if (usersTeamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            var TeamJobPositions = _jobPositionsRepository.GetJobPositionsByTeamsId(Guid.Parse(request.teamId));
            if (TeamJobPositions == null)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            var result = usersTeamMembers
                .Join(TeamJobPositions,
                    TeamMember => TeamMember.JobPositionId,
                    JobPosition => JobPosition.JobPositionId,
                    (TeamMember, JobPosition) => new
                    {
                        TeamMember,
                        JobPosition
                    })
                .FirstOrDefault(x => x.JobPosition.Title == request.jobPosition);

            if (result == null)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            _teamMemberRepository.DeleteTeamMembersFromCollection(new List<TeamMember> { result.TeamMember });

            return Unit.Value;
        }
    }
}
