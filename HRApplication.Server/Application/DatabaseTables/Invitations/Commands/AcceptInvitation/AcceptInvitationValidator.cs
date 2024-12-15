using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.AcceptInvitation
{
    public class AcceptInvitationValidator : AbstractValidator<AcceptInvitationRequest>
    {
        public AcceptInvitationValidator() {
            RuleFor(x => x.jobPositionId)
                   .NotEmpty().WithMessage("JobPositionId is required.")
                   .Must(GuidValidator.IsValidGuid).WithMessage("JobPositionId can only contain alphanumeric characters and hyphens.");
        }
    }
}
