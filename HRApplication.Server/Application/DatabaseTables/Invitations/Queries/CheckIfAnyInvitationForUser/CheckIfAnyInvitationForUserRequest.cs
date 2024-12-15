using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Queries.CheckIfAnyInvitationForUser
{
    public record CheckIfAnyInvitationForUserRequest() : IRequest<ErrorOr<Boolean>>;
}
