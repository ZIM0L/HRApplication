using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public record TeamRequest(string name, Guid userId) : IRequest<ErrorOr<TeamResult>>;
}
