using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.RemoveTeamMemberJobPosition
{
    public record RemoveTeamMemberJobPositionRequest(string email, string jobPosition, string teamId) : IRequest<ErrorOr<Unit>>;
}
