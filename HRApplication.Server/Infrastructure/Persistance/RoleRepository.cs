using HRApplication.Server.Application.Interfaces;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class RoleRepository : IRolesRepository
    {
        private readonly DBDatabase _dbContex;
        public RoleRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }
        public bool CheckIfRoleNameExists(string roleName)
        {
            var response = _dbContex.Roles.FirstOrDefault(x => x.rolename == roleName );
            if (response != null)
            {
                return true;
            }
            return false;
        }
    }
}
