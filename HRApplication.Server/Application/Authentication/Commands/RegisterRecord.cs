
namespace HRApplication.Server.Application.Authentication.Commands
{
    public record RegisterRecord(
        string name,
        string surname,
        string email,
        string password,
        string phone,
        string roleName) ;
}
