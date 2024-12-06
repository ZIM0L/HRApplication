namespace HRApplication.Server.Domain.Models
{
    public class TeamsMembersTask
    {
        public TeamsMembersTask(Guid teammemberid, Guid teamtaskid)
        {
            TeamsMembersTaskId = Guid.NewGuid();
            TeamMemberId = teammemberid;
            TeamTaskId = teamtaskid;
        }
        public Guid TeamsMembersTaskId { get; set; }
        public Guid TeamMemberId { get; set; }
        public Guid TeamTaskId { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
    }
}
