using ErrorOr;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Queries
{
    public record GetTeamRequest() : IRequest<ErrorOr<Team>>;
}
