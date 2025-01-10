namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents
{
    public record CalendarEventResult(Guid calendareventid, string title, string description, string category, DateTime startDate, DateTime endDate,string permission, string? location = null);
   
}
