namespace HRApplication.Server.Domain.Models.UserSearchDTO
{
    public class UserSearchDTO
    {
        public UserSearchDTO(string name, string surname, string email)
        {
            Name = name;
            Surname = surname;
            Email = email;
        }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
    }
}
