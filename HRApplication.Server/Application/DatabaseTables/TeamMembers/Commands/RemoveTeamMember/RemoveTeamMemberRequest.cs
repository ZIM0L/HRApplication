using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.RemoveTeamMember
{
    public record RemoveTeamMemberRequest(Guid teamId, string email) : IRequest<ErrorOr<Unit>>;
}
