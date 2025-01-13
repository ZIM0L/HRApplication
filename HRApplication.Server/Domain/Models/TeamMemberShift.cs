namespace HRApplication.Server.Domain.Models
{
    public class TeamMemberShift
    {

        // Konstruktor
        public TeamMemberShift(Guid teamMemberId, Guid teamShiftId, DateTime shiftDate)
        {
            TeamMemberShiftId = Guid.NewGuid();
            TeamMemberId = teamMemberId;
            TeamShiftId = teamShiftId;
            ShiftDate = shiftDate;
            CheckInTime = null;  
            CheckOutTime = null;  
        }
        public Guid TeamMemberShiftId { get; set; } 
        public Guid TeamMemberId { get; set; }      
        public Guid TeamShiftId { get; set; }       
        public DateTime ShiftDate { get; set; }     
        public DateTime? CheckInTime { get; set; }    
        public DateTime? CheckOutTime { get; set; }   
    }
}
