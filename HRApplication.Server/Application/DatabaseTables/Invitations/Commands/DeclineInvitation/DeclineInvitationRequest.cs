using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.DeclineInvitation
{
    public record DeclineInvitationRequest() : IRequest<ErrorOr<Unit>>;
}
