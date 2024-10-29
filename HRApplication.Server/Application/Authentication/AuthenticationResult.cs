
using HRApplication.Server.Domain.Models;

namespace Application.Authentication
{
    public record AuthenticationResult(User user, string token, string refreshToken);
}
