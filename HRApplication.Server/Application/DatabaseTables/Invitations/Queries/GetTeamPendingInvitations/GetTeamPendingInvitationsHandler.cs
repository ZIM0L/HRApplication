using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Queries.GetTeamPendingInvitations
{
    public class GetTeamPendingInvitationsHandler : IRequestHandler<GetTeamPendingInvitationsRequest, ErrorOr<List<InvitationResult>?>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IInvitationRepository _invitationRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public GetTeamPendingInvitationsHandler(IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository)
        {
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<List<InvitationResult>?>> Handle(GetTeamPendingInvitationsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);
            if (_teamMemberRepository.GetTeamMembersByTeamIdAndUserId(request.teamId, Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }
            return _invitationRepository.GetTeamPendingInvitationsByTeamId(request.teamId);
        }
    }
}
