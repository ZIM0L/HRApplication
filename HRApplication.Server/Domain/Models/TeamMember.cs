
namespace HRApplication.Server.Domain.Models
{
    public class TeamMember
    {
        public TeamMember(Guid userId, Guid teamId, Guid? jobPositionId, string roleName)
        {
            TeamMemberId = Guid.NewGuid();
            UserId = userId;
            TeamId = teamId;
            JobPositionId = jobPositionId;
            RoleName = roleName;
        }
        public Guid TeamMemberId { get; set; }
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
        public Guid? JobPositionId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.Now;
        public DateTime? LeftAt { get; set; } = null;
        public string RoleName { get; set; }
        public Boolean IsActive { get; set; } = true;
        //
        public User User { get; set; }
        public Team Team { get; set; }
        public JobPosition JobPosition { get; set; }
    }
}
