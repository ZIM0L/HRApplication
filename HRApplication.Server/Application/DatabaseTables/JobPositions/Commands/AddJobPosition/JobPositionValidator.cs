using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands.AddJobPosition
{
    public class JobPositionValidator : AbstractValidator<JobPositionRequest>
    {
        public JobPositionValidator()
        {
            RuleFor(x => x.teamId)
                .NotEmpty().WithMessage("TeamId is required.")
                .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");

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
