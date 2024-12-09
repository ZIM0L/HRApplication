using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public record JobPositionRequest
    (
    string title,
    string description
    ) : IRequest<ErrorOr<Unit>>;
}
