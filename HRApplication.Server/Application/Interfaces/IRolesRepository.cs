namespace HRApplication.Server.Application.Interfaces
{
    public interface IRolesRepository
    {
        bool CheckIfRoleNameExists(string roleName);
    }
}
