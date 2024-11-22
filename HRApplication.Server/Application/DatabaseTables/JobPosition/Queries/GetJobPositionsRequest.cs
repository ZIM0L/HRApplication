using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Queries
{
    public record GetJobPositionsRequest() : IRequest<ErrorOr<List<JobPositionsResult>>>;
}
