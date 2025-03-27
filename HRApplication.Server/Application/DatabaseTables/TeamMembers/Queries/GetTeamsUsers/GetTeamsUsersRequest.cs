using ErrorOr;
using HRApplication.Server.Domain.Models.UserDTO;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetTeamsUsers
{
    public record GetTeamsUsersRequest(string teamId) : IRequest<ErrorOr<List<UserDTO>>>;
}
