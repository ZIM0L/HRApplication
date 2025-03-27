using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.RemoveTeamMember
{
    public class RemoveTeamMemberHandler : IRequestHandler<RemoveTeamMemberRequest, ErrorOr<Unit>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public RemoveTeamMemberHandler(ITeamMemberRepository teamMemberRepository, IHttpContextAccessor httpContextAccessor, ITeamRepository teamRepository, IUserRepository userRepository)
        {
            _teamMemberRepository = teamMemberRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(RemoveTeamMemberRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, request.teamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            var userToDelete = _userRepository.GetUserByEmail(request.email);
            if (userToDelete == null)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }
            if (userToDelete.UserId == Guid.Parse(BearerCheckerResult.Value.Payload.Sub))
            {
                return CustomErrorOr.CustomErrors.Team.UserForbiddenAction;
            }
            var teamMembersToDelete = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(request.teamId, userToDelete.UserId);
            if (teamMembersToDelete == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            _teamMemberRepository.DeleteTeamMembersFromCollection(teamMembersToDelete);

            return Unit.Value;
        }
    }
}
