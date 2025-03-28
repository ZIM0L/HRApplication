using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ChangeUserCredentials
{
    public record ChangeUserCredentialsRequest(string name, string surname, string email, string phoneNumber, string password) : IRequest<ErrorOr<Unit>>;
}
