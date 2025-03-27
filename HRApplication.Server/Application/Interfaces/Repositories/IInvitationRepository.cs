using HRApplication.Server.Application.DatabaseTables;
using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface IInvitationRepository
    {
        void AddInvitation(Invitation invitation);
        Invitation? GetInvitationById(Guid invitationId);
        bool CheckIfAnyInvitationForUser(Guid userId);
        Invitation? IsInvitationAlreadyCreated(Invitation invitation);
        List<Invitation>? GetInvitatiosnByJobPositionId(Guid jobPositionId);
        List<InvitationResult>? GetAllUserInvitations(Guid userId);
        List<InvitationResult>? GetTeamPendingInvitationsByTeamId(Guid teamId);
        void DeleteUserInvitation(Invitation invitation);
        void DeleteInvitations(List<Invitation> invitations);
    }
}
