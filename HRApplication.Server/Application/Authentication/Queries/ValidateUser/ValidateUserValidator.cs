using FluentValidation;

namespace HRApplication.Server.Application.Authentication.Queries.ValidateUser
{
    public class ValidateUserValidator : AbstractValidator<ValidateUserRequest>
    {
        public ValidateUserValidator()
        {
            RuleFor(x => x.userId).NotEmpty().WithMessage("userId is required");
            RuleFor(x => x.name).NotEmpty().WithMessage("name is required");
            RuleFor(x => x.surname).NotEmpty().WithMessage("surname is required");
            RuleFor(x => x.email).NotEmpty().WithMessage("email is required");
            RuleFor(x => x.phoneNumber).NotEmpty().WithMessage("phone number is required");
            RuleFor(x => x.role).NotEmpty().WithMessage("role is required");
        }
    }
}
