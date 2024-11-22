using HRApplication.Server.Application.Authentication.Queries.ValidateUser;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        User? GetUserByEmail(string email);
        User? GetUserByGivenUser(ValidateUserRequest request);
        User? GetUserById(Guid id);
        User? GetUserByRefreshToken(string refreshToken); //TODO: move to different interface
        void UpdateUser(User user);
    }
}
