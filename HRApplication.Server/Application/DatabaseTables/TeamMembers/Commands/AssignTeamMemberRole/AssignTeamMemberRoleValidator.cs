using FluentValidation;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AssignTeamRole;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AssignTeamMemberRole
{
    public class AssignTeamMemberRoleValidator : AbstractValidator<AssignTeamMemberRoleRequest>
    {
        public AssignTeamMemberRoleValidator()
        {
            RuleFor(x => x.teamId)
             .NotEmpty().WithMessage("teamId is required")
             .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("teamId must be a valid GUID");

            RuleFor(x => x.email)
             .NotEmpty().WithMessage("Email must not be empty.")
             .EmailAddress().WithMessage("Invalid email address.");

            RuleFor(x => x.jobPosition)
            .NotEmpty().WithMessage("Job position must not be empty.");
        }
    }
}
