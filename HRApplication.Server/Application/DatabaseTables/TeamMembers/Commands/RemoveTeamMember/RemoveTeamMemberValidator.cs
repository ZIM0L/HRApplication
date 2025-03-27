using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.RemoveTeamMember
{
    public class RemoveTeamMemberValidator : AbstractValidator<RemoveTeamMemberRequest>
    {
        public RemoveTeamMemberValidator()
        {
            RuleFor(x => x.teamId)
                .NotEmpty().WithMessage("TeamId is required")
                .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("TeamId must be a valid GUID");

            RuleFor(x => x.email)
                .NotEmpty().WithMessage("Email must not be empty.") 
                .EmailAddress().WithMessage("Invalid email address.");  
        }
    }
}
