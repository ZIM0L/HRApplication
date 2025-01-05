using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands.DisbandTeam
{
    public class DisbandTeamValidator : AbstractValidator<DisbandTeamRequest>
    {
        public DisbandTeamValidator()
        {
            RuleFor(x => x.teamId)
              .NotEmpty().WithMessage("TeamId is required.")
              .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");
        }
    }
}
