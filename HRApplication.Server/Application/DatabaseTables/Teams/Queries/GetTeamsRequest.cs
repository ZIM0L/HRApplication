using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Queries
{
    public record GetTeamsRequest() : IRequest<ErrorOr<List<TeamResult>>>;
}
