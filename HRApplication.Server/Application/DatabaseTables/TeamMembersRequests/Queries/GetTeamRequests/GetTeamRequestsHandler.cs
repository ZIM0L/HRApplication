using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Queries.GetTeamRequests
{
    public class GetTeamRequestsHandler : IRequestHandler<GetTeamRequestsRequest, ErrorOr<List<TeamRequestsResult>?>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamMemberRequestsRepository _teamRequestsRepository;
        private readonly IUserRepository _userRepository;

        public GetTeamRequestsHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamMemberRequestsRepository teamRequestsRepository, IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRequestsRepository = teamRequestsRepository;
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<List<TeamRequestsResult>?>> Handle(GetTeamRequestsRequest request, CancellationToken cancellationToken)
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
            var isUserAdministrator = userTeamMembers.FirstOrDefault(x => x.RoleName == "Administrator");
            var teamUsersIds = _teamMemberRepository.GetTeamMembersByTeamIdFromCollection(teamId).Select(user => user.UserId).Distinct();
            // if admin
            if (isUserAdministrator != null)
            {
                return _teamRequestsRepository?.GetTeamMemberRequestsByTeamId(teamId)!
                    .Join(teamUsersIds,
                    userRequest => userRequest.UserId,
                    UserTeamId => UserTeamId,
                    (userRequest, UserTeamId) =>
                    new
                    {
                        userRequest.UserId,
                        userRequest.TeamMemberRequestId,
                        userRequest.Title,
                        userRequest.RequestContent,
                        userRequest.Status,
                        userRequest.AlteredAt,
                        userRequest.SubmittedAt,
                        userRequest.AnswerContent
                    }
                    )
                    .Join(_userRepository.GetUsersAllUsers()!,
                        UsersRequests => UsersRequests.UserId,
                        AllUsers => AllUsers.UserId,
                        (UsersRequests, AllUsers) =>
                        new TeamRequestsResult
                        (
                             UsersRequests.TeamMemberRequestId,
                             UsersRequests.Title,
                             UsersRequests.RequestContent,
                             UsersRequests.Status,
                             AllUsers.Name,
                             AllUsers.Surname,
                             AllUsers.Email,
                             UsersRequests.SubmittedAt,
                             UsersRequests.AlteredAt,
                             UsersRequests.AnswerContent
                        )
                    ).ToList();
            }

            var userRequests = _teamRequestsRepository!.GetTeamMemberRequestsByUserIdAndTeamId(Guid.Parse(BearerCheckerResult.Value.Payload.Sub), Guid.Parse(request.teamId));
            return userRequests!.Join(_userRepository.GetUsersAllUsers()!,
                       UsersRequests => UsersRequests.UserId,
                       AllUsers => AllUsers.UserId,
                       (UsersRequests, AllUsers) =>
                       new TeamRequestsResult
                       (
                            UsersRequests.TeamMemberRequestId,
                            UsersRequests.Title,
                            UsersRequests.RequestContent,
                            UsersRequests.Status,
                            AllUsers.Name,
                            AllUsers.Surname,
                            AllUsers.Email,
                            UsersRequests.SubmittedAt,
                            UsersRequests.AlteredAt, 
                            UsersRequests.AnswerContent
                       )
                   ).ToList();
        }
    }
}