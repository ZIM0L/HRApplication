using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands.DeleteTeamMemberShift
{
    public class DeleteTeamMemberShiftHandler : IRequestHandler<DeleteTeamMemberShiftRequest, ErrorOr<Unit>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberShiftsRepository _teamMemberShiftsRepository;
        private readonly ITeamShiftsRepository _teamShiftsRepository;
        private readonly IUserRepository _userRepository;
        public DeleteTeamMemberShiftHandler(ITeamMemberRepository teamMemberRepository, IHttpContextAccessor httpContextAccessor, ITeamShiftsRepository teamShiftsRepository, ITeamMemberShiftsRepository teamMemberShiftsRepository, IUserRepository userRepository)
        {
            _teamMemberRepository = teamMemberRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamShiftsRepository = teamShiftsRepository;
            _teamMemberShiftsRepository = teamMemberShiftsRepository;
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(DeleteTeamMemberShiftRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamShiftId = Guid.Parse(request.teamShiftId);
            var dateToDelete = DateTime.Parse(request.date);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_teamShiftsRepository.GetTeamShiftById(teamShiftId) is not TeamShift teamShift)
            {
                return CustomErrorOr.CustomErrors.Shift.ShiftDoesnotExists;
            }

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, teamShift.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            var user = _userRepository.GetUserByEmail(request.email);
            if (user == null)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }
            var TeamShifts = _teamShiftsRepository.GetTeamShiftsByTeamId(teamShift.TeamId);
            var UsersShifts = _teamMemberShiftsRepository.GetTeamMemberShiftsByTeamShiftId(teamShift.TeamShiftId);

            var UserTeamShift = UsersShifts?.Join(
                TeamShifts!,
                userShift => userShift.TeamShiftId,
                teamShift => teamShift.TeamShiftId,
                (userShift, teamShift) => new
                {
                    userShift.ShiftDate,
                    userShift.UserId,
                    userShift.TeamMemberShiftId,
                    teamShift.TeamId
                }).ToList();
            var shiftIdToDelete =  UserTeamShift?.SingleOrDefault(x => x.ShiftDate == dateToDelete)?.TeamMemberShiftId;
            if (shiftIdToDelete == null)
            {
                return CustomErrorOr.CustomErrors.Shift.ShiftDoesnotExists;
            }
            var toDelete = _teamMemberShiftsRepository.GetTeamMemberShiftByTeamMemberShiftId(shiftIdToDelete);

            _teamMemberShiftsRepository.DeleteTeamMemberShfits(new List<TeamMemberShift> { toDelete! });
            return Unit.Value;
        }
    }
}
