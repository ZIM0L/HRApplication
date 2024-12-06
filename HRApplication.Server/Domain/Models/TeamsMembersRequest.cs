namespace HRApplication.Server.Domain.Models
{
    public class TeamsMembersRequest
    {
        public TeamsMembersRequest(Guid teammemberid)
        {
            TeamsMembersRequestId = Guid.NewGuid();
            TeamMemberId = teammemberid;
        }
        public Guid TeamsMembersRequestId { get; set; }
        public Guid TeamMemberId { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
