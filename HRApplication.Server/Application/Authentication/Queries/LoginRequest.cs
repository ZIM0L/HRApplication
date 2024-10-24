namespace HRApplication.Server.Application.Authentication.Queries
{
    public record LoginRequest(
        string email,
        string password);
}
