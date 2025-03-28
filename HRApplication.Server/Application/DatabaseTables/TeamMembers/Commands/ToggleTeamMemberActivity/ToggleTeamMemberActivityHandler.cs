using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.ToggleTeamMemberActivity
{
    public class ToggleTeamMemberActivityHandler : IRequestHandler<ToggleTeamMemberActivityRequest, ErrorOr<Unit>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public ToggleTeamMemberActivityHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }

        public async Task<ErrorOr<Unit>> Handle(ToggleTeamMemberActivityRequest request, CancellationToken cancellationToken)
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
            if (_userRepository.GetUserByEmail(request.email) is not User userToModify)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }
            if (userToModify.UserId == Guid.Parse(BearerCheckerResult.Value.Payload.Sub))
            {
                return CustomErrorOr.CustomErrors.Team.UserForbiddenAction;
            }
            var teamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(Guid.Parse(request.teamId), userToModify.UserId);
            if (teamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            teamMembers.ForEach(teamMember =>
            {
                teamMember.IsActive = !teamMember.IsActive;
            });
            _teamMemberRepository.UpdateTeamMembersFromCollection(teamMembers);

            return Unit.Value;
        }
    }
}
