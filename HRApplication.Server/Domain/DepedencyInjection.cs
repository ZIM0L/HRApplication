using FluentValidation;
using MediatR;
using System.Reflection;
namespace Domain
{
    public static class DepedencyInjection
    {
        public static IServiceCollection AddDomain(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}
