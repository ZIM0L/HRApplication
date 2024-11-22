using FluentValidation;
using HRApplication.Server.Application.Authentication.Commands;

namespace ReactApp1.Server.Application.Authentication.Commands.Register
{
    public class LoginQueryValidator : AbstractValidator<RegisterRequest>
    {
        public LoginQueryValidator()
        {
            RuleFor(x => x.name).NotEmpty().WithMessage("Name is required");
            RuleFor(x => x.surname).NotEmpty().WithMessage("Surname is required");
            RuleFor(x => x.email).NotEmpty().WithMessage("Email is required").EmailAddress().WithMessage("Email address is required");
            RuleFor(x => x.password).NotEmpty().WithMessage("Password is required");
            RuleFor(x => x.phone).NotEmpty().WithMessage("Phone is required");
            RuleFor(x => x.roleName).NotEmpty().WithMessage("Role for user is required");
        }
    }
}
