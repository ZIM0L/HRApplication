using ErrorOr;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands
{
    public record DeclineInvitationRequest(string invitationId) : IRequest<ErrorOr<Unit>>;
}
