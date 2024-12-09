using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.JobPositions;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPosition.Queries.GetJobPositionsBasedOnTeams
{
    public record GetJobPositionsBasedOnTeamsRequest(string teamId) : IRequest<ErrorOr<List<JobPositionsResult>>>;
}
