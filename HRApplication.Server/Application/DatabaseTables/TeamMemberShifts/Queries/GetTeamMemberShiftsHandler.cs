using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;
using System.Linq;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Queries
{
    public class GetTeamMemberShiftsHandler : IRequestHandler<GetTeamMemberShiftsRequest, ErrorOr<List<TeamMemberShiftResult>?>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberShiftsRepository _teamMemberShiftsRepository;
        private readonly ITeamShiftsRepository _teamShiftsRepository;
        private readonly IUserRepository _userRepository;

        public GetTeamMemberShiftsHandler(ITeamMemberRepository teamMemberRepository, IHttpContextAccessor httpContextAccessor, ITeamMemberShiftsRepository teamMemberShiftsRepository, IUserRepository userRepository, ITeamShiftsRepository teamShiftsRepository)
        {
            _teamMemberRepository = teamMemberRepository;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberShiftsRepository = teamMemberShiftsRepository;
            _userRepository = userRepository;
            _teamShiftsRepository = teamShiftsRepository;
        }
        public async Task<ErrorOr<List<TeamMemberShiftResult>?>> Handle(GetTeamMemberShiftsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var teamId = Guid.Parse(request.teamId);
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var teamMembers = _teamMemberRepository.GetTeamMembersByTeamIdFromCollection(teamId);
            if (teamMembers == null || !teamMembers.Any())
            {
                return CustomErrorOr.CustomErrors.Team.NoMembersInTeam;
            }

            var userIds = teamMembers.Select(tm => tm.UserId).Distinct().ToList();
            var users = _userRepository.GetUsersByIds(userIds) ?? new List<User>();
            var teamMemberIds = teamMembers.Select(tm => tm.TeamMemberId).ToList();
            var teamMembershifts = _teamMemberShiftsRepository.GetTeamMemberShiftsByUsersId(userIds) ?? new List<TeamMemberShift>();
            var teamShifts = _teamShiftsRepository.GetTeamShiftsByTeamId(teamId) ?? new List<TeamShift>();

            var teamMemebersShifts = teamMembers
                .Join(users,
                member => member.UserId,
                user => user.UserId,
                (member, user) => new
                {
                    Email = user.Email,
                    UserId = user.UserId,
                })
                .Distinct()
                .Join(teamMembershifts,
                member => member.UserId,
                teamMembershifts => teamMembershifts.UserId,
                (member, teamShift) => new
                {
                    Email = member.Email,
                    UserId = member.UserId,
                    TeamShiftId = teamShift.TeamShiftId,
                    ShiftDate = teamShift.ShiftDate,
                    CheckInTime = teamShift.CheckInTime,
                    CheckOutTime = teamShift.CheckOutTime 
                })
                .Join(teamShifts,
                member => member.TeamShiftId,
                teamShift => teamShift.TeamShiftId,
                (member, teamShift) => new TeamMemberShiftResult
                (
                    teamShiftId: member.TeamShiftId,
                    email: member.Email,
                    shiftDate: member.ShiftDate,
                    checkInTime: member.CheckInTime,
                    checkOutTime: member.CheckOutTime,
                    startShift: teamShift.ShiftStart,
                    endShift: teamShift.ShiftEnd
                )).ToList();

            return teamMemebersShifts;
        }
    }
}
