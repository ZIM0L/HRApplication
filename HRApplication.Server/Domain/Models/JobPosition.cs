namespace HRApplication.Server.Domain.Models
{
    public class JobPosition
    {
        public JobPosition(string title, string description)
        {
            JobPositionId = Guid.NewGuid();
            Title = title;
            Description = description;
        }
        public Guid JobPositionId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Boolean IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }

    }
}
