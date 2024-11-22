using FluentValidation;
using HRApplication.Server.Application.Authentication.Queries;

namespace ReactApp1.Server.Application.Authentication.Queries.LoginQueryValidator
{
    public class LoginQueryValidator : AbstractValidator<LoginRequest>
    {
        public LoginQueryValidator()
        {
            RuleFor(x => x.email).NotEmpty()
                .WithMessage("Email address is required")
                .EmailAddress()
                .WithMessage("A valid email is required");
            RuleFor(x => x.password).NotEmpty()
                .WithMessage("Password address is required");
        }
    }
}
