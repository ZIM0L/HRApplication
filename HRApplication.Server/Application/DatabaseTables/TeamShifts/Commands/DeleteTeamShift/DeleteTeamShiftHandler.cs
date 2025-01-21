using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.DeleteTeamShift
{
    public class DeleteTeamShiftHandler : IRequestHandler<DeleteTeamShiftRequest, ErrorOr<Unit>>
    {
        private readonly ITeamShiftsRepository _teamShiftRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamMemberShiftsRepository _teamMemberShiftsRepository;
        public DeleteTeamShiftHandler(ITeamShiftsRepository teamShiftRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamMemberShiftsRepository teamMemberShiftsRepository)
        {
            _teamShiftRepository = teamShiftRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamMemberShiftsRepository = teamMemberShiftsRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(DeleteTeamShiftRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamShiftId = Guid.Parse(request.teamShiftId);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if(_teamShiftRepository.GetTeamShiftByTeamShiftId(teamShiftId) is not TeamShift teamShift)
            {
                return CustomErrorOr.CustomErrors.Shift.ShiftDoesnotExists;
            }

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamShift.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            var teamMembersShiftsToRemove = _teamMemberShiftsRepository.GetTeamMemberShiftsByTeamShiftId(Guid.Parse(request.teamShiftId));
            _teamMemberShiftsRepository.DeleteTeamMemerShfits(teamMembersShiftsToRemove!);
            _teamShiftRepository.DeleteTeamShift(teamShift);

            return Unit.Value;
        }
    }
}
