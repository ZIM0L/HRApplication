namespace HRApplication.Server.Domain.Models
{
    public class UserShift
    {
        public UserShift(Guid userid)
        {
            UserShiftId = Guid.NewGuid();
            UserId = userid;
        }
        public Guid UserShiftId { get; set; }
        public Guid UserId { get; set; }
        public DateTime StartTime { get; set; } = DateTime.UtcNow;
        public DateTime? FinishTime { get; set; }
    }
}
