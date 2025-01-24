using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.DeleteTeamRequest
{
    public record DeleteTeamRequestRequest(string teammemberrequestid) : IRequest<ErrorOr<Unit>>;

}
