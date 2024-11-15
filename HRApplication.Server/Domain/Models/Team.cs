namespace HRApplication.Server.Domain.Models
{
    public class Team
    {
        public Team(string name)
        {
            TeamId = Guid.NewGuid();
            Name = name;
        }
        public Guid TeamId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Boolean IsActive { get; set; } = true;
    }
}
