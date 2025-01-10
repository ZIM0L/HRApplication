using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.DeleteCalendarEvent
{
    public class DeleteCalendarEventValidator : AbstractValidator<DeleteCalendarEventRequest>
    {
        public DeleteCalendarEventValidator()
        {
            RuleFor(x => x.calendareventid)
              .NotEmpty().WithMessage("calendarEventId is required.")
              .Must(GuidValidator.IsValidGuid).WithMessage("calendarEventId must be a valid GUID.");
        }
    }
}
