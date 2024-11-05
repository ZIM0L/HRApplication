using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces
{
    public interface IUserRepository
    {
        void AddUser(User user);
        User? GetUserByEmail(string email);
        User? GetUserByRefreshToken(string refreshToken); //TODO: move to different interface
        void UpdateUser(User user);
    }
}
