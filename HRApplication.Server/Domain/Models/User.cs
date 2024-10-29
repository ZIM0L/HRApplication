using HRApplication.Server.Domain.Models;

public class User
{
    public User(string name, string surname, string email, string password, string phoneNumber)
    {
        UserId = Guid.NewGuid();
        Name = name;
        Surname = surname;
        Email = email;
        Password = password;
        PhoneNumber = phoneNumber;
        CreatedAt = DateTime.Now;
        isActive = '0';
    }

    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public char isActive { get; set; }
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; }
}
