using FluentValidation;
using HRApplication.Server.Application.DatabaseTables.Invitation.Commands;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands
{
    public class SendInvitationValidator : AbstractValidator<SendInvitationRequest>
    {
        public SendInvitationValidator() {
            RuleFor(request => request.userid)
                 .NotEmpty().WithMessage("User ID is required.")
                 .Must(x => x != string.Empty).WithMessage("User ID must be a valid GUID.");

            RuleFor(request => request.jobpositionid)
                .NotEmpty().WithMessage("Job Position ID is required.")
                .Must(x => x != string.Empty).WithMessage("Job Position ID must be a valid GUID.");

            RuleFor(request => request.name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(100).WithMessage("Name cannot exceed 50 characters.");

            RuleFor(request => request.surname)
                .NotEmpty().WithMessage("Surname is required.")
                .MaximumLength(100).WithMessage("Surname cannot exceed 50 characters.");

            RuleFor(request => request.email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");
        }
    }
}
