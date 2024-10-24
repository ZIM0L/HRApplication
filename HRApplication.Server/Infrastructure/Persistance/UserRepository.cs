using HRApplication.Server.Application.Interfaces;
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
    }
}
