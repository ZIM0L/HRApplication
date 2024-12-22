using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Queries.GetTeamInfo
{
    public class GetTeamValidator : AbstractValidator<GetTeamRequest>
    {
        public GetTeamValidator()
        {
            RuleFor(x => x.teamId)
               .NotEmpty().WithMessage("teamId is required")
               .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("teamId must be a valid GUID");
        }
    }
}
