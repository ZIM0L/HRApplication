using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.DeleteTeamShift
{
    public class DeleteTeamShiftValidator :AbstractValidator<DeleteTeamShiftRequest>
    {
        public DeleteTeamShiftValidator()
        {
            RuleFor(x => x.teamShiftId)
               .NotEmpty().WithMessage("teamShiftId is required.")
               .Must(GuidValidator.IsValidGuid).WithMessage("teamShiftId must be a valid GUID.");
        }
    }
}
