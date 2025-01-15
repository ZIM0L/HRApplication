using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands
{

    public class AddNewTeamRequestHandler : IRequestHandler<AddNewTeamRequestRequest, ErrorOr<TeamRequestsResult>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamMemberRequestsRepository _teamRequestsRepository;
        public AddNewTeamRequestHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamMemberRequestsRepository teamRequestsRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRequestsRepository = teamRequestsRepository;
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
            var userRequest = new TeamsMemberRequest(Guid.Parse(BearerCheckerResult.Value.Payload.Sub), teamId, request.requestContent, request.title);
           

            var isUserAdministrator = userTeamMembers.FirstOrDefault(x => x.RoleName == "Administrator");
            if (isUserAdministrator == null)
            {
                _teamRequestsRepository.AddTeamMemberRequest(userRequest);
                return new TeamRequestsResult(
                    userRequest.TeamsMembersRequestId,
                    userRequest.Title,
                    userRequest.RequestContent,
                    userRequest.Status);
            }
        }
    }
}
