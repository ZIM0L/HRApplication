using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands.DeleteJobPosition
{
    public record DeleteJobPositionRequest(string jobPositionId) : IRequest<ErrorOr<Unit>>;
}
