using HRApplication.Server.Domain.Models;

namespace ReactApp1.Server.Application.Interfaces.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
        string GenerateRefreshToken(string token);
    }
}
