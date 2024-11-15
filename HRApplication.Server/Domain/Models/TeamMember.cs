namespace HRApplication.Server.Domain.Models
{
    public class TeamMember
    {
        public TeamMember(Guid userId, Guid teamId)
        {
            TeamMemberId = Guid.NewGuid();
            UserId = userId;
            TeamId = teamId;
        }
        public Guid TeamMemberId { get; set; }
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.Now;
        public DateTime? LeftAt { get; set; }
    }
}
