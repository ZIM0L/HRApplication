namespace HRApplication.Server.Domain.Models
{
    public class TeamShift
    {

        // Konstruktor
        public TeamShift(Guid teamId, TimeSpan shiftStart, TimeSpan shiftEnd)
        {
            TeamShiftId = Guid.NewGuid();
            TeamId = teamId;
            ShiftStart = shiftStart;
            ShiftEnd = shiftEnd;
        }
        public Guid TeamShiftId { get; set; }
        public Guid TeamId { get; set; }
        public TimeSpan ShiftStart { get; set; }
        public TimeSpan ShiftEnd { get; set; }
    }
}
