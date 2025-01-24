using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.DeleteTeamRequest
{
    public class DeleteTeamRequestHandler : IRequestHandler<DeleteTeamRequestRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamMemberRequestsRepository _teamRequestsRepository;
        private readonly IUserRepository _userRepository;
        public DeleteTeamRequestHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamMemberRequestsRepository teamRequestsRepository, IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRequestsRepository = teamRequestsRepository;
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(DeleteTeamRequestRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamMemberRequestId = Guid.Parse(request.teammemberrequestid);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if(_teamRequestsRepository.GetTeamMemberRequestById(teamMemberRequestId) is not TeamMemberRequest teamMemberRequest)
            {
                return CustomErrorOr.CustomErrors.TeamRequest.RequestDoesNotExists;
            }

            var userTeamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(teamMemberRequest.TeamId, Guid.Parse(BearerCheckerResult.Value.Payload.Sub));

            if (userTeamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }

            var isUserAdministrator = userTeamMembers.FirstOrDefault(x => x.RoleName == "Administrator");

            if (isUserAdministrator == null)
            {
                if (teamMemberRequest.UserId != Guid.Parse(BearerCheckerResult.Value.Payload.Sub))
                {
                    return CustomErrorOr.CustomErrors.TeamRequest.ForbiddenAction;
                }
            }

            _teamRequestsRepository.DeleteTeamMemberRequest(teamMemberRequest);

            return Unit.Value;
        }
    }
}
