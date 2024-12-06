using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands
{
    public class AddTeamMemberValidator : AbstractValidator<AddTeamMemberRequest>
    {
        public AddTeamMemberValidator()
        {
            RuleFor(x => x.userId)
                .NotEmpty().WithMessage("UserId is required")
                .Must(x => x != Guid.Empty).WithMessage("UserId must be a valid GUID");

            RuleFor(x => x.teamId)
                .NotEmpty().WithMessage("TeamId is required")
                .Must(x => x != Guid.Empty).WithMessage("TeamId must be a valid GUID");

            RuleFor(x => x.roleName)
                .NotEmpty().WithMessage("RoleName is required")
                .MaximumLength(50).WithMessage("RoleName cannot exceed 50 characters")
                .Matches("^[a-zA-Z0-9 ]+$").WithMessage("RoleName can only contain alphanumeric characters and spaces");
        }
    }
}
