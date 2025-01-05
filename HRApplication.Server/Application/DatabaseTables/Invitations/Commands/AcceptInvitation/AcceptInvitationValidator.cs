using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.AcceptInvitation
{
    public class AcceptInvitationValidator : AbstractValidator<AcceptInvitationRequest>
    {
        public AcceptInvitationValidator() {
            RuleFor(x => x.invitaitonId)
                   .NotEmpty().WithMessage("invitaitonId is required.")
                   .Must(GuidValidator.IsValidGuid).WithMessage("invitaitonId can only contain alphanumeric characters and hyphens.");
        }
    }
}
