public class User
{
    public User(string name, string surname, string email, string? password = null, string? phoneNumber = null)
    {
        UserId = Guid.NewGuid();
        Name = name;
        Surname = surname;
        Email = email;
        Password = password;  
        PhoneNumber = phoneNumber;
        CreatedAt = DateTime.UtcNow;
    }

    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string? Password { get; set; }  
    public string? PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; }
    public DateTime? GoogleRefreshTokenExpiryTime { get; set; }
    public Boolean? IsGoogleLoggedIn { get; set; } = false;
    public string? UserProfilePathImage { get; set; }
}
