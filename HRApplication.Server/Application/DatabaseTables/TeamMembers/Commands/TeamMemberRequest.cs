using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands
{
    public record AddTeamMemberRequest(Guid userId, Guid teamId) : IRequest<ErrorOr<Unit>>;

}
