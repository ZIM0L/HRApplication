namespace HRApplication.Server.Domain.Models.UserDTO
{
    public class UserDTO
    {
        public UserDTO(string name, string surname, string email, string? phoneNumber)
        {
            Name = name;
            Surname = surname;
            Email = email;
            PhoneNumber = phoneNumber;
        }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string JobPosition { get; set; } = string.Empty;
        public string Permission { get; set; } = string.Empty;
        public DateTime? LeftAt { get; set; }
        public DateTime JoinedAt { get; set; }
        public Boolean isActive { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
