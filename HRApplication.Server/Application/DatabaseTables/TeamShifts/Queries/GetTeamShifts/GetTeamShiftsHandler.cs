using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Queries.GetTeamShifts
{
    public class GetTeamShiftsHandler : IRequestHandler<GetTeamShiftsRequest, ErrorOr<List<TeamShiftResult>?>>
    {
        private readonly ITeamShiftsRepository _teamShiftRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public GetTeamShiftsHandler(ITeamShiftsRepository teamShiftRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository)
        {
            _teamShiftRepository = teamShiftRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<List<TeamShiftResult>?>> Handle(GetTeamShiftsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamId = Guid.Parse(request.teamId);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            return _teamShiftRepository?.GetTeamShifts(teamId)
                ?.Select(shift => new TeamShiftResult(shift.TeamShiftId, shift.ShiftStart, shift.ShiftEnd)).ToList();
        }
    }
}
