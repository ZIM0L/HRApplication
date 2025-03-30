using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ChangePassword
{
    public record ChangePasswordRequest(string password,string newPassword) : IRequest<ErrorOr<Unit>>;
}
