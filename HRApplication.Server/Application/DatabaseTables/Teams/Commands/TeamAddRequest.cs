using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public record TeamAddRequest(string name, string country, string phoneNumber) : IRequest<ErrorOr<TeamResult>>;
}
