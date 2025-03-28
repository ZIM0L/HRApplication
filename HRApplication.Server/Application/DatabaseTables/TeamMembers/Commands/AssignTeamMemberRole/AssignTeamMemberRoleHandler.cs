using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AssignTeamRole;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Domain.Models.UserDTO;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AssignTeamMemberRole
{
    public class AssignTeamMemberRoleHandler : IRequestHandler<AssignTeamMemberRoleRequest, ErrorOr<UserDTO>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IJobPositionsRepository _jobPositionsRepository;

        public AssignTeamMemberRoleHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, IJobPositionsRepository jobPositionsRepository)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _jobPositionsRepository = jobPositionsRepository;
        }

        public async Task<ErrorOr<UserDTO>> Handle(AssignTeamMemberRoleRequest request, CancellationToken cancellationToken)
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
            if (_userRepository.GetUserByEmail(request.email) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }
            var teamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(Guid.Parse(request.teamId), user.UserId);
            if (teamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }

            var jobPosition = _jobPositionsRepository.GetJobPositionByTeamIdAndTitle(Guid.Parse(request.teamId), request.jobPosition);
            if (jobPosition == null)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            var existingTeamMember = _teamMemberRepository.GetTeamMemberByUserIdAndJobPositionId(jobPosition.JobPositionId, user.UserId);
            if (existingTeamMember != null)
            {
                return CustomErrorOr.CustomErrors.Team.TeamMemeberAlreadyInCollection;
            }

            var newTeamMember = new TeamMember(user.UserId, Guid.Parse(request.teamId), jobPosition.JobPositionId, "Employee");
            _teamMemberRepository.AddNewTeamMemberToCollection(newTeamMember);

            return new UserDTO(
                user.Name,
                user.Surname,
                user.Email,
                user.PhoneNumber
            )
            {
                JobPosition = jobPosition.Title,
                Permission = "Employee",
                JoinedAt = newTeamMember.JoinedAt,
                LeftAt = newTeamMember.LeftAt,
                isActive = newTeamMember.IsActive
            };
        }
    }
} 
