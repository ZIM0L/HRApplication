using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands.DeleteTeamMemberShift
{
    public class DeleteTeamMemberShiftValidator : AbstractValidator<DeleteTeamMemberShiftRequest>
    {
        public DeleteTeamMemberShiftValidator()
        {
            // Walidacja pola teamShiftId
            RuleFor(request => request.teamShiftId)
                .NotEmpty().WithMessage("Team Shift ID is required.")
                .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("Team Shift ID must be a valid GUID.");

            RuleFor(x => x.email)
                .NotEmpty().WithMessage("Email cannot be empty.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(x => x.date)
                .NotEmpty().WithMessage("Date cannot be empty.");
        }
    }
}
