using Microsoft.EntityFrameworkCore;

namespace HRApplication.Server.Domain.Models
{
    [Keyless]
    public class Role
    {
        public string rolename { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
    }
}
