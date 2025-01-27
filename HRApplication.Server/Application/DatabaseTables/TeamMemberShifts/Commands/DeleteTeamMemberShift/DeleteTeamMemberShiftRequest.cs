using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands.DeleteTeamMemberShift
{
    public record DeleteTeamMemberShiftRequest(string teamShiftId, string email, string date) : IRequest<ErrorOr<Unit>>;

}
