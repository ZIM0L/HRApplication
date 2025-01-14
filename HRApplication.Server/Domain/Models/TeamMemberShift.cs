namespace HRApplication.Server.Domain.Models
{
    public class TeamMemberShift
    {

        // Konstruktor
        public TeamMemberShift(Guid userId, Guid teamShiftId, DateTime shiftDate)
        {
            TeamMemberShiftId = Guid.NewGuid();
            UserId = userId;
            TeamShiftId = teamShiftId;
            ShiftDate = shiftDate;
            CheckInTime = null;  
            CheckOutTime = null;  
        }
        public Guid TeamMemberShiftId { get; set; } 
        public Guid UserId { get; set; }      
        public Guid TeamShiftId { get; set; }       
        public DateTime ShiftDate { get; set; }     
        public TimeSpan? CheckInTime { get; set; }    
        public TimeSpan? CheckOutTime { get; set; }   
    }
}
