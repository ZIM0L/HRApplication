using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ChangePassword
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordValidator()
        {
            RuleFor(x => x.password)
                .NotEmpty().WithMessage("Old password is required.");

            RuleFor(x => x.newPassword)
                .NotEmpty().WithMessage("New password is required.")
                .MinimumLength(6).WithMessage("New password must be at least 6 characters long.");
        }
    }

}
