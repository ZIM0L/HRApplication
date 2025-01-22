using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Queries.GetUserInvitations
{
    public record GetUserInvitationsRequest() : IRequest<ErrorOr<List<InvitationResult>?>>;
}
