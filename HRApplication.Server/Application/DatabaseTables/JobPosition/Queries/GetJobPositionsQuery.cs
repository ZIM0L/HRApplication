using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Queries
{
    public record GetJobPositionsQuery() : IRequest<ErrorOr<List<JobPositionsResult>>>;
}
