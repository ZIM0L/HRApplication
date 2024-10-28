using Application.Authentication;
using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.Authentication.Commands
{
    public record RegisterRecord(
        string name,
        string surname,
        string email,
        string password,
        string phone) ;
}
