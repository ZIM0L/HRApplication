using ErrorOr;
using HRApplication.Server.Application.DatabaseTables;
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
            _dbContex.SaveChanges();
        }

        public void DeleteUserInvitation()
        {
            throw new NotImplementedException();
        }

        public Invitation? IsInvitationAlreadyCreated(Invitation invitation)
        {
            return _dbContex.Invitations.FirstOrDefault(x => x.UserId == invitation.UserId && x.JobPositionId == invitation.JobPositionId && x.SendByUserId == invitation.SendByUserId);
        }

        List<InvitationResult> IInvitationRepository.GetAllUserInvitations(Guid userId)
        {
            var invitations = _dbContex.Invitations
            .Where(i => i.UserId == userId)
            .Join(_dbContex.Job_Positions,  
                invitation => invitation.JobPositionId,  // Foreign key Invitations
                jobPosition => jobPosition.JobPositionId,  // Primary key JobPositions
                (invitation, jobPosition) => new
                {
                    invitation.InvitationId,
                    invitation.SubmittedAt,
                    invitation.SendByUserId,
                    jobPosition.JobPositionId, // JobPositionId
                    jobPosition.TeamId,  // TeamId JobPosition
                    jobPosition.Title,
                    jobPosition.IsActive
                })
            .Join(_dbContex.Users,
                result => result.SendByUserId,  // Foreign key Invitations
                User => User.UserId,  // Primary key JobPositions
                (result, User) => new
                {
                    result.InvitationId,
                    result.SubmittedAt,
                    result.SendByUserId,
                    result.JobPositionId,
                    result.TeamId,
                    result.Title,
                    result.IsActive,
                    User.Name,
                    User.Surname
                })
            .Join(_dbContex.Teams,
                result => result.TeamId,  // Foreign key from previous Join (TeamId)
                team => team.TeamId,  // Primary key Teams
                (result, team) => new InvitationResult
                (
                    result.InvitationId, // InviteId
                    result.Name,  // Sender Name
                    result.Surname,  // Sender Surname
                    result.JobPositionId, // JobPositionId 
                    result.Title,  // Title JobPosition
                    team.Name,  // Team name
                    team.Industry,  // Team Industry
                    result.SubmittedAt  // Invite Submit
                ))
            .ToList();

            return invitations;
        }
    }
}
