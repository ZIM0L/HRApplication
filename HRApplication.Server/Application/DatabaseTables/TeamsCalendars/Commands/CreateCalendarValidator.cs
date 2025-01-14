using FluentValidation;
using HRApplication.Server.Application.DatabaseTables.Commands;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamsCalendars.Commands
{
    public class CreateCalendarValidator : AbstractValidator<CreateCalendarRequest>
    {
        public CreateCalendarValidator()
        {
            RuleFor(x => x.teamId)
             .NotEmpty().WithMessage("TeamId is required.")
             .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");
        }
    }
}
