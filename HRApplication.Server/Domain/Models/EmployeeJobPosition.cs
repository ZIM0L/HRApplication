namespace HRApplication.Server.Domain.Models
{
    public class EmployeeJobPosition
    {
        public EmployeeJobPosition(Guid userId, Guid jobPositionId)
        {
            EmployeeJobPositionId = Guid.NewGuid();
            UserId = userId;
            JobPositionId = jobPositionId;
        }
        public Guid EmployeeJobPositionId { get; set; }
        public Guid UserId { get; set; }
        public Guid JobPositionId { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime? EndDate { get; set; }
    }
}
