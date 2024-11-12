using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class UserRepository : IUserRepository
    {
        private readonly DBDatabase _dbContex;
        public UserRepository(DBDatabase dbContex) {
            _dbContex = dbContex;
        }
        public void AddUser(User user)
        {
            _dbContex.Add<User>(user);
            _dbContex.SaveChanges();
        }

        public User? GetUserByEmail(string email)
        {
            return _dbContex.Users.SingleOrDefault(x => x.Email == email);
        }
        public User? GetUserById(Guid id)
        {
            return _dbContex.Users.SingleOrDefault(x => x.UserId == id);
        }
        public User? GetUserByRefreshToken(string refreshToken)
        {
            return _dbContex.Users.SingleOrDefault(x => x.RefreshToken == refreshToken);
        }

        public void UpdateUser(User user)
        {
            _dbContex.Users.Update(user);
            _dbContex.SaveChanges();
        }
    }
}
