using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.DatabaseTables.Teams
{
    public record TeamResult(string name, string industry, string country,string? url,string? email,string? address, string? city, string? phoneNumber, string? zipCode);
}

