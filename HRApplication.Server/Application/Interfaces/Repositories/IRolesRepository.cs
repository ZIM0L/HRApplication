namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface IRolesRepository
    {
        bool CheckIfRoleNameExists(string roleName);
    }
}
