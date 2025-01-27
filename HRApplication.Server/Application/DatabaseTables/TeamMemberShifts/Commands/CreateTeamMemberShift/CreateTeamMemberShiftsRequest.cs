using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands.CreateTeamMemberShift
{
    public record CreateTeamMemberShiftsRequest(string email, string teamShiftId, List<string> teamMemberShiftsDates) : IRequest<ErrorOr<List<TeamMemberShiftResult>>>;

}
