namespace HRApplication.Server.Domain.Models
{
    public class Schedule
    {
        public Schedule(Guid userId, string type, string description)
        {
            Scheduleid = Guid.NewGuid();
            Userid = userId;
            Type = type;
            Description = description;
        }
        public Guid Scheduleid { get; set; }
        public Guid Userid { get; set; }
        public DateTime Starttime { get; set; } = DateTime.Now;
        public DateTime? Endtime { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
    }
}
