using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.CreateNewTeamShift
{
    public class CreateNewTeamShiftHandler : IRequestHandler<CreateNewTeamShiftRequest, ErrorOr<TeamShiftResult>>
    {
        private readonly ITeamShiftsRepository _teamShiftRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public CreateNewTeamShiftHandler(ITeamShiftsRepository teamShiftRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository)
        {
            _teamShiftRepository = teamShiftRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<TeamShiftResult>> Handle(CreateNewTeamShiftRequest request, CancellationToken cancellationToken)
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
            var shift = new TeamShift(
                teamId,
                TimeSpan.Parse(request.shiftStart),
                TimeSpan.Parse(request.shiftEnd)
                );
            var teamShifts = _teamShiftRepository.GetTeamShifts(teamId)?.ToList();
            if(teamShifts?.FirstOrDefault( x => x.ShiftStart == shift.ShiftStart && x.ShiftEnd == shift.ShiftEnd) is TeamShift)
            {
                return CustomErrorOr.CustomErrors.Shift.ShiftAlreadyExists;
            }
            _teamShiftRepository.AddNewTeamShift(shift);

            return new TeamShiftResult(
                shift.TeamShiftId,
                shift.ShiftStart,
                shift.ShiftEnd);
        }
    }
}
