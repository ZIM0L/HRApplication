using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands
{
    public class JobPositionValidator : AbstractValidator<JobPositionRequest>
    {
        public JobPositionValidator()
        {
            RuleFor(jobPosition => jobPosition.title).NotEmpty()
                .WithMessage("Job title is required");
            RuleFor(jobPosition => jobPosition.description).NotEmpty()
                .WithMessage("Job description is required");
        }
    }
}
