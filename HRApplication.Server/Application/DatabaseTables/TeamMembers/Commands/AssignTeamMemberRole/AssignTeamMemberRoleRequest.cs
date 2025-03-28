using ErrorOr;
using HRApplication.Server.Domain.Models.UserDTO;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AssignTeamRole
{
    public record AssignTeamMemberRoleRequest(string teamId, string email, string jobPosition) : IRequest<ErrorOr<UserDTO>>;
}
