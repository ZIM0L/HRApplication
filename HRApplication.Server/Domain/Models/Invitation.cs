namespace HRApplication.Server.Domain.Models
{
    public class Invitation
    {
        public Invitation(Guid userId, Guid sendByUserId, Guid jobPositionId)
        {
            UserId = userId;
            SendByUserId = sendByUserId;
            JobPositionId = jobPositionId;
        }
        public Guid InvitationId { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public Guid JobPositionId { get; set; }
        public Guid SendByUserId { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public Boolean IsActive { get; set; } = true;
        //
        public User User { get; set; }
        public JobPosition JobPosition { get; set; }
    }
}
