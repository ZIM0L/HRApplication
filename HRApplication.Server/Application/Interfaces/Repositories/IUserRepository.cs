using HRApplication.Server.Application.Authentication.Queries.ValidateUser;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        User? GetUserByEmail(string email);
        User? GetUserByGivenUser(ValidateUserRequest request);
        User? GetUserById(Guid id);
        List<User>? GetUsersByIds(List<Guid> id);
        List<User>? GetUsersAllUsers();
        List<User>? GetUsersByNameAndSurname(List<string> query);
        User? GetUserByRefreshToken(string refreshToken); //TODO: move to different interface
        void UpdateUser(User user);

    }
}
