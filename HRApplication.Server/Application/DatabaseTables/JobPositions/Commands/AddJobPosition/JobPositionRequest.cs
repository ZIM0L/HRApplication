using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands.AddJobPosition
{
    public record JobPositionRequest(string teamId, string title, string description, bool isRecruiting) : IRequest<ErrorOr<JobPositionsResult>>;
}
