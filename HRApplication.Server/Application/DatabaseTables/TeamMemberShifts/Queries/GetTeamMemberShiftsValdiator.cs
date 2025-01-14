using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Queries
{
    public class GetTeamMemberShiftsValdiator :AbstractValidator<GetTeamMemberShiftsRequest>
    {
        public GetTeamMemberShiftsValdiator()
        {
            RuleFor(x => x.teamId)
             .NotEmpty().WithMessage("teamId is required")
             .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("teamId must be a valid GUID");
        }
    }
}
