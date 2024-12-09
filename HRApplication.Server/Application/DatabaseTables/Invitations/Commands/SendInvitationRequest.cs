using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitation.Commands
{
    public record SendInvitationRequest(string userid, string jobpositionid, string name, string surname, string email) : IRequest<ErrorOr<Unit>>;

}
