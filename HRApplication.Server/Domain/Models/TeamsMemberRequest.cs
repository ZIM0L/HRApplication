namespace HRApplication.Server.Domain.Models
{
    public class TeamsMemberRequest
    {
        public TeamsMemberRequest(Guid userid, Guid teamId, string requestContent, string title)
        {
            TeamsMembersRequestId = Guid.NewGuid();
            UserId = userid;
            TeamId = teamId;
            RequestContent = requestContent;
            Title = title;
        }
        public Guid TeamsMembersRequestId { get; set; }
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; } = "Pending";
        public string RequestContent { get; set; } = string.Empty;
        
    }
}
