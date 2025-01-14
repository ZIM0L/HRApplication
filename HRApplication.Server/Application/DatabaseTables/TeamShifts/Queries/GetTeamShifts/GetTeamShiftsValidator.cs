using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamShifts.Queries.GetTeamShifts
{
    public class GetTeamShiftsValidator : AbstractValidator<GetTeamShiftsRequest>
    {
        public GetTeamShiftsValidator()
        {
            RuleFor(x => x.teamId)
             .NotEmpty().WithMessage("TeamId is required.")
             .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");
        }
    }
}
