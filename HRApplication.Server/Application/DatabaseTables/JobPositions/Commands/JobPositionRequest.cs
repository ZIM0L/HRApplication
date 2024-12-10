using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public record JobPositionRequest(string teamId,string title,string description,Boolean isRecruiting) : IRequest<ErrorOr<Unit>>;
}
