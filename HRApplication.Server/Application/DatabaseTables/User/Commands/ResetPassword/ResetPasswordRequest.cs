using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ResetPassword
{
    public record ResetPasswordRequest(string token, string newPassword) : IRequest<ErrorOr<bool>>;
}
