using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.SendInvitation
{
    public record SendInvitationRequest(string userid, string jobpositionid, string name, string surname, string email) : IRequest<ErrorOr<Unit>>;

}
