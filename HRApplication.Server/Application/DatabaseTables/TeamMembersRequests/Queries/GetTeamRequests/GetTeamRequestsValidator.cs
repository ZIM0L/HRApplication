using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Queries.GetTeamRequests
{
    public class GetTeamRequestsValidator : AbstractValidator<GetTeamRequestsRequest>
    {
        public GetTeamRequestsValidator()
        {
            RuleFor(x => x.teamId)
               .NotEmpty().WithMessage("TeamId is required.")
               .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");
        }
    }
}
