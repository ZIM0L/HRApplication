using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.ResolveTeamRequest
{
    public class ResolveTeamRequestHandler : IRequestHandler<ResolveTeamRequestRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamMemberRequestsRepository _teamRequestsRepository;

        public ResolveTeamRequestHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamMemberRequestsRepository teamRequestsRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRequestsRepository = teamRequestsRepository;
        }

        public async Task<ErrorOr<Unit>> Handle(ResolveTeamRequestRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var teamMemberRequestId = Guid.Parse(request.teamMemberRequestId);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_teamRequestsRepository.GetTeamMemberRequestById(teamMemberRequestId) is not TeamMemberRequest teamMemberRequest)
            {
                return CustomErrorOr.CustomErrors.TeamRequest.RequestDoesNotExists;
            }

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamMemberRequest.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            if(teamMemberRequest.Status == "resolved")
            {
                return CustomErrorOr.CustomErrors.TeamRequest.CannotResolve;
            }
            teamMemberRequest.Status = "resolved";
            teamMemberRequest.AnswerContent = request?.answerContent;
            _teamRequestsRepository.UpdateTeamMemberRequest(teamMemberRequest);

            return Unit.Value;
        }
    }
}