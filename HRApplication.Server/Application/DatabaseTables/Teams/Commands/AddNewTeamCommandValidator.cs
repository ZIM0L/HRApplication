using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public class GetTeamValidator : AbstractValidator<TeamAddRequest>
    {
        public GetTeamValidator()
        {
            RuleFor(x => x.name)
               .NotEmpty().WithMessage("Name is required")
               .MaximumLength(100).WithMessage("Name cannot exceed 100 characters");

            RuleFor(x => x.country)
                .NotEmpty().WithMessage("Country is required")
                .Length(2, 50).WithMessage("Country must be between 2 and 50 characters");

            RuleFor(x => x.phoneNumber)
                .NotEmpty().WithMessage("Phone number is required")
                .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Invalid phone number format");

        }
    }
}
