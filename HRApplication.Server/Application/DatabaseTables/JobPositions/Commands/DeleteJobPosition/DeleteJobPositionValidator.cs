using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands.DeleteJobPosition
{
    public class DeleteJobPositionValidator :AbstractValidator<DeleteJobPositionRequest>
    {
        public DeleteJobPositionValidator()
        {
            RuleFor(x => x.jobPositionId)
               .NotEmpty().WithMessage("jobPositionId is required.")
               .Must(GuidValidator.IsValidGuid).WithMessage("jobPositionId must be a valid GUID.");
        }
    }
}
