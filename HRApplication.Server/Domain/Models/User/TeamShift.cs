namespace HRApplication.Server.Domain.Models.User
{
    public class TeamShift
    {

        // Konstruktor
        public TeamShift( Guid teamId, DateTime shiftStart, DateTime shiftEnd)
        {
            TeamShiftId = Guid.NewGuid();
            TeamId = teamId;
            ShiftStart = shiftStart;
            ShiftEnd = shiftEnd;
        }
        public Guid TeamShiftId { get; set; } 
        public Guid TeamId { get; set; }     
        public DateTime ShiftStart { get; set; }
        public DateTime ShiftEnd { get; set; }  
    }
}
