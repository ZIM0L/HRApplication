namespace HRApplication.Server.Domain.Models
{
    public class CalendarEvent
    {
        public CalendarEvent(Guid teamsCalendarId, string title, string description, string category, DateTime startDate, DateTime endDate, string permission, string? location = null, Guid? teamTaskId = null)
        {
            CalendarEventId = Guid.NewGuid();
            Title = title;
            StartDate = startDate;
            EndDate = endDate;
            TeamsCalendarId = teamsCalendarId;
            Location = location;
            Category = category;
            Description = description;
            TeamTaskId = teamTaskId;
            Permission = permission;
        }
        public Guid CalendarEventId { get; set; }
        public Guid TeamsCalendarId { get; set; }
        public Guid? TeamTaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Location { get; set; }
        public string Permission {  get; set; }
        //
        public TeamsCalendar TeamsCalendar { get; set; }

    }
}
