using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Globalization;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands
{
    public class CreateTeamMemberShiftsHandler : IRequestHandler<CreateTeamMemberShiftsRequest, ErrorOr<List<TeamMemberShiftResult>>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberShiftsRepository _teamMemberShiftsRepository;
        private readonly ITeamShiftsRepository _teamShiftsRepository;
        private readonly IUserRepository _userRepository;
        public CreateTeamMemberShiftsHandler(ITeamMemberRepository teamMemberRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberShiftsRepository teamMemberShiftsRepository, ITeamShiftsRepository teamShiftsRepository, IUserRepository userRepository)
        {
            _teamMemberRepository = teamMemberRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberShiftsRepository = teamMemberShiftsRepository;
            _teamShiftsRepository = teamShiftsRepository;
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<List<TeamMemberShiftResult>>> Handle(CreateTeamMemberShiftsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamShiftId = Guid.Parse(request.teamShiftId);
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
            var existingShifts = _teamMemberShiftsRepository
                .GetTeamMemberShiftsByUserIdAndDates(user.UserId, request.teamMemberShiftsDates.Select(tsd => DateTime.ParseExact(tsd, "dd-MM-yyyy", CultureInfo.InvariantCulture)).ToList());

            // Usuń istniejące zmiany dla tych dat (nadpisywanie)
            if (existingShifts != null && existingShifts.Any())
            {
                _teamMemberShiftsRepository.RemoveTeamMemberShifts(existingShifts);
            }

            var teamMemberShifts = request.teamMemberShiftsDates
                .Select(tsd => new TeamMemberShift(
                user.UserId,
                teamShift.TeamShiftId,
                DateTime.ParseExact(tsd, "dd-MM-yyyy", CultureInfo.InvariantCulture)
                ))
                .ToList();

            _teamMemberShiftsRepository.AddTeamMemberShifts(teamMemberShifts);

            return teamMemberShifts
                .Select(shift => new TeamMemberShiftResult(
                    email: user.Email,
                    shiftDate: shift.ShiftDate,
                    startShift: teamShift.ShiftStart,
                    endShift: teamShift.ShiftEnd,
                    checkInTime: null, 
                    checkOutTime: null
                ))
                .ToList();
        }
    }
}
