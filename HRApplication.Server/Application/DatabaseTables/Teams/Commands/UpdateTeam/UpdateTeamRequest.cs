using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public record UpdateTeamRequest(
    Guid teamId,
    string? Name ,
    string? Industry ,
    string? Country ,
    string? Url ,
    string? Email ,
    string? Address ,
    string? City ,
    string? PhoneNumber ,
    string? ZipCode
    ) : IRequest<ErrorOr<TeamResult>>;
}
