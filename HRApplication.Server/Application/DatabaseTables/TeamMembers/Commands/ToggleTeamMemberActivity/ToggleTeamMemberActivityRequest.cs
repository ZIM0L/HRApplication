using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.ToggleTeamMemberActivity
{
    public record ToggleTeamMemberActivityRequest(string teamId, string email) : IRequest<ErrorOr<DateTime>>;
}
