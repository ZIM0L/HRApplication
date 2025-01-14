using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Queries
{
    public record GetTeamMemberShiftsRequest(string teamId) :IRequest<ErrorOr<List<TeamMemberShiftResult>?>>;
}
