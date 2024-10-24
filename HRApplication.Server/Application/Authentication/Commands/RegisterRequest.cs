using Application.Authentication;
using ErrorOr;
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
