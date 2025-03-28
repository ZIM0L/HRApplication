using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace HRApplication.Server.Domain.Models
{
    public class Team
    {
        public Team(string name, string country, string industry, string email)
        {
            TeamId = Guid.NewGuid();
            Name = name;
            Country = country;
            Industry = industry;
            Email = email;
        }
        public Guid TeamId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = null;
        public Boolean IsActive { get; set; } = true;
        public string Industry { get; set; } = "";
        public string Country { get; set; } = "";
        public string? Url { get; set; } = "";
        public string? Email { get; set; } = "";
        public string? Address { get; set; } = "";
        public string? City { get; set; } = "";
        public string? PhoneNumber { get; set; } = "";
        public string? ZipCode { get; set; } = "";
        public string? TeamProfilePathImage { get; set; }
        //
        internal ICollection<TeamMember> TeamMembers { get; set; } = new List<TeamMember>();
        internal ICollection<JobPosition> JobPositions { get; set; } = new List<JobPosition>();
        internal ICollection<TeamShift> TeamShifts { get; set; } = new List<TeamShift>();
        internal ICollection<TeamQuestion> TeamQuestions { get; set; } = new List<TeamQuestion>();
        internal ICollection<TeamMemberRequest> TeamMembersRequests { get; set; } = new List<TeamMemberRequest>();
        internal ICollection<TeamsCalendar> TeamsCalendars { get; set; } = new List<TeamsCalendar>(); 
    }
}
