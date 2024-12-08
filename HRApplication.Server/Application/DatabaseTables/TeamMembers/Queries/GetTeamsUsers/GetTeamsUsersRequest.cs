using ErrorOr;
using HRApplication.Server.Domain.Models.User;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetTeamsUsers
{
    public record GetTeamsUsersRequest(string teamId) : IRequest<ErrorOr<List<UserDTO>>>;
}
