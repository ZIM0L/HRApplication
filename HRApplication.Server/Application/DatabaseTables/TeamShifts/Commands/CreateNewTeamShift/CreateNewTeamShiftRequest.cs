using ErrorOr;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.CreateNewTeamShift
{
    public record CreateNewTeamShiftRequest(string teamId, string shiftStart, string shiftEnd) : IRequest<ErrorOr<TeamShiftResult>>;
}
