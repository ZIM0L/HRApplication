namespace HRApplication.Server.Domain.Models
{
    public class TeamMember
    {
        public TeamMember(Guid userId, Guid teamId, string roleName)
        {
            TeamMemberId = Guid.NewGuid();
            UserId = userId;
            TeamId = teamId;
            RoleName = roleName;
        }
        public Guid TeamMemberId { get; set; }
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
        public Guid? JobPositionId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.Now;
        public DateTime? LeftAt { get; set; }
        public string RoleName { get; set; }
        public Boolean IsActive { get; set; } = true;  
    }
}
