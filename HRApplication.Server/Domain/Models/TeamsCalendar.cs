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
    }
}