using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public class JobPositionValidator : AbstractValidator<JobPositionRequest>
    {
        public JobPositionValidator()
        {
            RuleFor(x => x.teamId)
                .NotEmpty().WithMessage("TeamId is required.")
                .Matches(@"^[a-zA-Z0-9\-]+$").WithMessage("TeamId can only contain alphanumeric characters and hyphens.");

            RuleFor(x => x.title)
                .NotEmpty().WithMessage("Title is required.")
                .Length(3, 100).WithMessage("Title must be between 3 and 100 characters.");

            RuleFor(x => x.description)
                .NotEmpty().WithMessage("Description is required.")
                .Length(2, 500).WithMessage("Description must be between 2 and 500 characters.");

            RuleFor(x => x.isRecruiting)
                .NotNull().WithMessage("IsRecruiting is required.");
        }
    }
}
