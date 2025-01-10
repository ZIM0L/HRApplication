namespace HRApplication.Server.Domain.Models
{
    public class TeamsTask
    {
        public TeamsTask(string title, string description)
        {
            TeamTaskId = Guid.NewGuid();
            Title = title;
            Description = description;
        }
        public Guid TeamTaskId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty ;
    }
}
