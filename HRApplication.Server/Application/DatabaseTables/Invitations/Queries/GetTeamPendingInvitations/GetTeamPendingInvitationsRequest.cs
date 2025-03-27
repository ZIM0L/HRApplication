using ErrorOr;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Queries.GetTeamPendingInvitations
{
    public record GetTeamPendingInvitationsRequest(Guid teamId) : IRequest<ErrorOr<List<InvitationResult>?>>;
}
