using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.UpdateCalenderEvent
{
    public class UpdateCalendarEventValidator : AbstractValidator<UpdateCalendarEventRequest>
    {
        public UpdateCalendarEventValidator()
        {
            RuleFor(x => x.startDate)
                .NotEmpty().WithMessage("Start date is required.");

            RuleFor(x => x.endDate)
                .NotEmpty().WithMessage("End date is required.");

            RuleFor(x => x.title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(50).WithMessage("Title must not exceed 50 characters.");

            RuleFor(x => x.description)
                .MaximumLength(500).WithMessage("Description must not exceed 500 characters.");

            RuleFor(x => x.location)
                .MaximumLength(100).WithMessage("Location must not exceed 100 characters.");

            RuleFor(x => x.category)
                .NotEmpty().WithMessage("Category is required.")
                .Matches("^(Personal|WorkRelated|Team|HealthAndWellness|Meetings|Celebrations|Financial|Admin|Projects)$")
                .WithMessage("Category must be one of the following: Personal, WorkRelated, Team, HealthAndWellness, Meetings, Celebrations, Financial, Admin, Projects.");

            RuleFor(x => x.permission)
                .NotEmpty().WithMessage("Permission is required.");

            RuleFor(x => x.teamTaskId)
                .Must(x => string.IsNullOrEmpty(x) || GuidValidator.IsValidGuid(x))
                .WithMessage("TeamTaskId must be a valid GUID if provided.");
        }
    }
}
