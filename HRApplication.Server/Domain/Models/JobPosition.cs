namespace HRApplication.Server.Domain.Models
{
    public class JobPosition
    {
        public JobPosition(string title, string description, Guid teamId, bool isRecruiting)
        {
            JobPositionId = Guid.NewGuid();
            TeamId = teamId;
            Title = title;
            Description = description;
            IsRecruiting = isRecruiting;
        }
        public Guid JobPositionId { get; set; }
        public Guid TeamId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsRecruiting { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }
        //
        public Team Team { get; set; }
        public ICollection<TeamMember> TeamMembers { get; set; } = new List<TeamMember>();
        public ICollection<Invitation> Invitations { get; set; } = new List<Invitation>();
    }
}
