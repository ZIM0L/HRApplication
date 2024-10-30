using ErrorOr;
using HRApplication.Server.Application.Authentication.AuthenticationResults;
using MediatR;

namespace HRApplication.Server.Application.Authentication.Commands
{
    public record RegisterRequest(
       string name,
       string surname,
       string email,
       string password,
       string phone) : IRequest<ErrorOr<AuthenticationResult>>;
}
