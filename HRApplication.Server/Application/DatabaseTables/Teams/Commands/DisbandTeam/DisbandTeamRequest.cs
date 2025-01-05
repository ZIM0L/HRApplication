using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands.DisbandTeam
{
    public record DisbandTeamRequest(string teamId) : IRequest<ErrorOr<Unit>>;
}
