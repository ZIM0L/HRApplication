using FluentValidation;
using MediatR;
using ReactApp1.Server.Application.Common.Bevaviors;
using ReactApp1.Server.Application.Interfaces.Authentication;
using ReactApp1.Server.Infrastructure.Authentication;
using System.Reflection;
namespace Application
{
    public static class DepedencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

            //validator
            services.AddTransient(
            typeof(IPipelineBehavior<,>),
            typeof(ValidationdBehavior<,>)
            );

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
