using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ForgetPassword
{
    public record ForgetPasswordRequest(string email) : IRequest<ErrorOr<bool>>;
}
