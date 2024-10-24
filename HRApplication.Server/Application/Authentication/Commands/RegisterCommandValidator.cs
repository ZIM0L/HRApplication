using FluentValidation;
using HRApplication.Server.Application.Authentication.Commands;

namespace ReactApp1.Server.Application.Authentication.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterCommandValidator() {
            RuleFor(x => x.name).NotEmpty();
            RuleFor(x => x.surname).NotEmpty();
            RuleFor(x => x.email).NotEmpty();
            RuleFor(x => x.password).NotEmpty();
            RuleFor(x => x.phone).NotEmpty();
        }
    }
}
