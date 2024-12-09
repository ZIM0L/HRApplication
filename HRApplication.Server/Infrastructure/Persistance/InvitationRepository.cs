using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class InvitationRepository : IInvitationRepository
    {
        private readonly DBDatabase _dbContex;
        public InvitationRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddInvitation(Invitation invitation)
        {
            _dbContex.Invitations.Add(invitation);
        }

        public Invitation? IsInvitationAlreadyCreated(Invitation invitation)
        {
            return _dbContex.Invitations.FirstOrDefault(x => invitation.Equals(x));
        }
    }
}
