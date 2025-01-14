namespace HRApplication.Server.Application.DatabaseTables.TeamShifts
{
    public record TeamShiftResult(Guid teamShiftId, TimeSpan shiftStart, TimeSpan shiftEnd);
}
