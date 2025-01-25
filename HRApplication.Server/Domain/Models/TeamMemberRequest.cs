namespace HRApplication.Server.Domain.Models
{
    public class TeamMemberRequest
    {
        public TeamMemberRequest(Guid userId, Guid teamId, string requestContent, string title)
        {
            TeamMemberRequestId = Guid.NewGuid();
            UserId = userId;
            TeamId = teamId;
            RequestContent = requestContent;
            Title = title;
        }
        public Guid TeamMemberRequestId { get; set; }
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; } = "pending";
        public string RequestContent { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public DateTime? AlteredAt { get; set; }
        public string? AnswerContent { get; set; }
        
    }
}
