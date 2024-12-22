using HRApplication.Server.Application.Authentication.Queries.ValidateUser;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class UserRepository : IUserRepository
    {
        private readonly DBDatabase _dbContex;
        public UserRepository(DBDatabase dbContex)
        {
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

        public User? GetUserByGivenUser(ValidateUserRequest request)
        {
            return _dbContex.Users.SingleOrDefault(x => x.UserId.Equals(request.userId) &&
                                                        x.Name.Equals(request.name) &&
                                                        x.Surname.Equals(request.surname) &&
                                                        x.Email.Equals(request.email) &&
                                                        x.PhoneNumber.Equals(request.phoneNumber)
            );
        }

        public User? GetUserById(Guid id)
        {
            return _dbContex.Users.SingleOrDefault(x => x.UserId == id);
        }
        public User? GetUserByRefreshToken(string refreshToken)
        {
            return _dbContex.Users.SingleOrDefault(x => x.RefreshToken == refreshToken);
        }

        public List<User>? GetUsersByIds(List<Guid> id)
        {
            return _dbContex.Users.Where(x => id.Contains(x.UserId)).ToList();
        }

        public List<User>? GetUsersByNameAndSurname(List<string> query)
        {
            return _dbContex.Users
                           .Where(u => query.Any(q => u.Name.Contains(q) || u.Surname.Contains(q))) 
                           .ToList();
        }

        public void UpdateUser(User user)
        {
            _dbContex.Users.Update(user);
            _dbContex.SaveChanges();
        }
    }
}
 