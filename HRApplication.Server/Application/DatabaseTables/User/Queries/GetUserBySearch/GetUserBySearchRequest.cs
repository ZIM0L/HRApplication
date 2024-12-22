using ErrorOr;
using HRApplication.Server.Domain.Models.User;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Queries.GetUserBySearch
{
    public record GetUserBySearchRequest(string fullName, string? email) : IRequest<ErrorOr<List<UserSearchDTO>>>;
}
