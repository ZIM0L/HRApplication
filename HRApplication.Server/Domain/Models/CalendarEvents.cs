namespace HRApplication.Server.Domain.Models
{
    public class CalendarEvents
    {
        public CalendarEvents(Guid teamsCalendarId, string title, string description, string category, DateTime startDate, DateTime endDate, string? location = null)
        {
            CalendarEventsId = Guid.NewGuid();
            Title = title;
            StartDate = startDate;
            EndDate = endDate;
            TeamsCalendarId = teamsCalendarId;
            Location = location;
            Category = category;
            Description = description;
        }
        public Guid CalendarEventsId { get; set; }
        public Guid TeamsCalendarId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Location { get; set; }

    }
}
