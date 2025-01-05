using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AddTeamMember
{
    public class AddTeamMemberValidator : AbstractValidator<AddTeamMemberRequest>
    {
        public AddTeamMemberValidator()
        {
            RuleFor(x => x.userId)
                .NotEmpty().WithMessage("UserId is required")
                .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("UserId must be a valid GUID");

            RuleFor(x => x.teamId)
                .NotEmpty().WithMessage("TeamId is required")
                .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("TeamId must be a valid GUID");

            RuleFor(x => x.roleName)
                .NotEmpty().WithMessage("RoleName is required")
                .MaximumLength(50).WithMessage("RoleName cannot exceed 50 characters")
                .Matches("^[a-zA-Z0-9 ]+$").WithMessage("RoleName can only contain alphanumeric characters and spaces");
        }
    }
}
