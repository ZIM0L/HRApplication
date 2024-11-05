using Microsoft.EntityFrameworkCore;

namespace HRApplication.Server.Domain.Models
{
    [Keyless]
    public class Role
    {
        public string rolename {  get; set; }
        public string description { get; set; }
    }
}
