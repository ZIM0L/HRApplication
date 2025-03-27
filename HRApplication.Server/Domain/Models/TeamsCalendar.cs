namespace HRApplication.Server.Domain.Models
{
    public class TeamsCalendar
    {
        public TeamsCalendar(Guid teamId)
        {
            TeamsCalendarId = Guid.NewGuid();
            TeamId = teamId;
        }
        public Guid TeamsCalendarId { get; set; }
        public Guid TeamId { get; set; }
        public DateTime? UpdatedAt { get; set; }
        //
        public Team Team { get; set; }
        public ICollection<CalendarEvent> CalendarEvents { get; set; } = new List<CalendarEvent>();
    }
}