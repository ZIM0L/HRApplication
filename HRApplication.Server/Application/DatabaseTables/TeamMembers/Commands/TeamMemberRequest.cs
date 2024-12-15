using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands
{
    public record AddTeamMemberRequest(Guid userId, Guid teamId, Guid? jobPositionId, string roleName) : IRequest<ErrorOr<Unit>>;

}
