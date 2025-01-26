namespace HRApplication.Server.Domain.Models
{
    public class TeamQuestion
    {
        public TeamQuestion(Guid teamId, string title, string description)
        {
            TeamQuestionId = Guid.NewGuid();
            TeamId = teamId;
            Title = title;
            Description = description;
        }
        public Guid TeamQuestionId { get; set; }
        public Guid TeamId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;


    }
}
