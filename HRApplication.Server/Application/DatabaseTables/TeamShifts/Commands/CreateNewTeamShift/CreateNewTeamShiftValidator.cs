using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.CreateNewTeamShift
{
    public class CreateNewTeamShiftValidator : AbstractValidator<CreateNewTeamShiftRequest>
    {
        public CreateNewTeamShiftValidator()
        {
            RuleFor(x => x.teamId)
               .NotEmpty().WithMessage("TeamId is required.")
               .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");

            RuleFor(x => x.shiftStart.ToString())
             .NotEmpty().WithMessage("Shift start time cannot be null.");

            RuleFor(x => x.shiftEnd.ToString())
                .NotEmpty().WithMessage("Shift end time cannot be null.");
        }
    }
}
