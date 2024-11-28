using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Queries
{
    public record GetTeamRequest() : IRequest<ErrorOr<TeamResult>>;
}
