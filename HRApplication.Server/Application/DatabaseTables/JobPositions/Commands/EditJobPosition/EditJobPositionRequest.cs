using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands.EditJobPosition
{
    public record EditJobPositionRequest(string jobPositionId, string title, string description, bool isActive, bool isRecruiting) : IRequest<ErrorOr<JobPositionsResult>>;

}
