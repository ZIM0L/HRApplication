using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Queries
{
    public record GetAllTeamsRequest() : IRequest<ErrorOr<List<TeamResult>>>;
}
