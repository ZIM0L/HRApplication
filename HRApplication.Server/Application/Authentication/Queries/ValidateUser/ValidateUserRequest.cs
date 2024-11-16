using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.Authentication.Queries.ValidateUser
{
    public record ValidateUserRequest(
        Guid userId,
        string name,
        string surname,
        string email,
        string role,
        string phoneNumber) : IRequest<ErrorOr<User>>;
}
