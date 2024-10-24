
using HRApplication.Server.Application.Interfaces;
using HRApplication.Server.Application.JwtSettings;
using HRApplication.Server.Infrastructure.DBContex;
using HRApplication.Server.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public static class DepedencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager configuration)
        {
            services.AddDbContext<DBDatabase>(options =>
            options.UseSqlServer(configuration.GetConnectionString("MyConnectionString")));

            services.Configure<JwtSetting>(configuration.GetSection("JwtSetting"));
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
