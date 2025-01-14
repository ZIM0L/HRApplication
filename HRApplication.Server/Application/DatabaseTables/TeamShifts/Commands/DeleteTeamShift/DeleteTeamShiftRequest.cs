using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.DeleteTeamShift
{
    public record DeleteTeamShiftRequest(string teamShiftId) : IRequest<ErrorOr<Unit>>;
}
