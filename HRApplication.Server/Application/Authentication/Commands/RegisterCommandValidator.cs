using FluentValidation;
using HRApplication.Server.Application.Authentication.Commands;

namespace ReactApp1.Server.Application.Authentication.Commands.Register
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.name)
            .NotEmpty().WithMessage("Name is required");

            RuleFor(x => x.surname)
                .NotEmpty().WithMessage("Surname is required");

            RuleFor(x => x.email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email address format");

            RuleFor(x => x.password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long");

            RuleFor(x => x.phone)
                .NotEmpty().WithMessage("Phone is required")
                .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Phone number is not in a valid format");
        }
    }
}
