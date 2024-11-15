using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands
{
    public class AddTeamMemberValidator : AbstractValidator<AddTeamMemberRequest>
    {
        public AddTeamMemberValidator()
        {
            RuleFor(x => x.userId).NotEmpty().WithMessage("userId is required");
            RuleFor(x => x.teamId).NotEmpty().WithMessage("teamId is required");
        }
    }
}
