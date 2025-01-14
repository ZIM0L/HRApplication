namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts
{
    public record TeamMemberShiftResult(string email ,DateTime shiftDate,TimeSpan startShift, TimeSpan endShift, TimeSpan? checkInTime, TimeSpan? checkOutTime);
}
