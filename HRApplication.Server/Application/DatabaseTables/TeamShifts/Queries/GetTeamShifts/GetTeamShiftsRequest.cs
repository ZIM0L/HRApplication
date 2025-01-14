using ErrorOr;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Queries.GetTeamShifts
{
    public record GetTeamShiftsRequest(string teamId) : IRequest<ErrorOr<List<TeamShiftResult>?>>;
}
