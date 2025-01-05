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
        List<InvitationResult> GetAllUserInvitations(Guid userId);
        void DeleteUserInvitation(Invitation invitation);
    }
}
