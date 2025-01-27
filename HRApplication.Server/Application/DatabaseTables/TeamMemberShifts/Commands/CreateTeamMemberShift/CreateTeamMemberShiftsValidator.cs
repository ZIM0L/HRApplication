using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands.CreateTeamMemberShift
{
    public class CreateTeamMemberShiftsValidator : AbstractValidator<CreateTeamMemberShiftsRequest>
    {
        public CreateTeamMemberShiftsValidator()
        {
            RuleFor(request => request.email)
               .NotEmpty().WithMessage("Email is required.")
               .EmailAddress().WithMessage("Invalid email format.");

            // Walidacja pola teamShiftId
            RuleFor(request => request.teamShiftId)
                .NotEmpty().WithMessage("Team Shift ID is required.")
                .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("Team Shift ID must be a valid GUID.");

            // Walidacja listy TeamMemberShiftsDates
            RuleFor(request => request.teamMemberShiftsDates)
                .NotEmpty().WithMessage("Team Member Shifts Dates cannot be empty.");

        }
    }
}
