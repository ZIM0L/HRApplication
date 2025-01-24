using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.AddNewTeamRequest
{

    public class AddNewTeamRequestHandler : IRequestHandler<AddNewTeamRequestRequest, ErrorOr<TeamRequestsResult>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamMemberRequestsRepository _teamRequestsRepository;
        private readonly IUserRepository _userRepository;
        public AddNewTeamRequestHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamMemberRequestsRepository teamRequestsRepository, IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRequestsRepository = teamRequestsRepository;
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<TeamRequestsResult>> Handle(AddNewTeamRequestRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamId = Guid.Parse(request.teamId);
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var userTeamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(teamId, Guid.Parse(BearerCheckerResult.Value.Payload.Sub));

            if (userTeamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            var userRequest = new TeamMemberRequest(Guid.Parse(BearerCheckerResult.Value.Payload.Sub), teamId, request.requestContent, request.title);

            if (_userRepository.GetUserById(Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            var isUserAdministrator = userTeamMembers.FirstOrDefault(x => x.RoleName == "Administrator");
            if (isUserAdministrator == null)
            {
                _teamRequestsRepository.AddTeamMemberRequest(userRequest);
                return new TeamRequestsResult(
                    userRequest.TeamMemberRequestId,
                    userRequest.Title,
                    userRequest.RequestContent,
                    userRequest.Status,
                    user.Name,
                    user.Surname,
                    user.Email,
                    userRequest.SubmittedAt,
                    userRequest.AlteredAt);
            }
            //temp
            return CustomErrorOr.CustomErrors.Team.UserForbiddenAction;
        }
    }
}
