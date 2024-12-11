using HRApplication.Server.Application.DatabaseTables;
using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface IInvitationRepository
    {
        void AddInvitation(Invitation invitation);
        Invitation? IsInvitationAlreadyCreated(Invitation invitation);
        List<InvitationResult> GetAllUserInvitations(Guid userId);
        void DeleteUserInvitation();
    }
}
