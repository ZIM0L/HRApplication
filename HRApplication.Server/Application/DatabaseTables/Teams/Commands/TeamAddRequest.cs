using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public record TeamAddRequest(string name, Guid userId) : IRequest<ErrorOr<TeamResult>>;
}
