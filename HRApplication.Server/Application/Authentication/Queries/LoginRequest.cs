using ErrorOr;
using HRApplication.Server.Application.Authentication.AuthenticationResults;
using MediatR;

namespace HRApplication.Server.Application.Authentication.Queries
{
    public record LoginRequest(
        string email,
        string password) : IRequest<ErrorOr<AuthenticationResult>>;
}
