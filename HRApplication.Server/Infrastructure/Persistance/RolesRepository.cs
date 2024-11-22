using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class RolesRepository : IRolesRepository
    {
        private readonly DBDatabase _dbContex;
        public RolesRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }
        // TODO: check if can be made better
        public bool CheckIfRoleNameExists(string roleName)
        {
            var response = _dbContex.Roles.SingleOrDefault(x => x.rolename == roleName);
            if (response != null)
            {
                return true;
            }
            return false;
        }
    }
}
