using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;

namespace HRApplication.Server.Domain.Models
{
    public class JobPosition
    {
        public JobPosition(string title, string description, Guid teamId)
        {
            JobPositionId = Guid.NewGuid();
            TeamId = teamId;
            Title = title;
            Description = description;
        }
        public Guid JobPositionId { get; set; }
        public Guid TeamId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Boolean IsActive { get; set; } = true;
        public Boolean IsRecruiting { get; set; } = false;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }

    }
}
