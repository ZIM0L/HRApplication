namespace HRApplication.Server.Domain.Models
{
    public class Application
    {
        public Application() { 
            ApplicationId = Guid.NewGuid();
        }
        public Guid ApplicationId { get; set; }
        public Guid UserID { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public DateTime? Changed { get; set; } 

    }
}
