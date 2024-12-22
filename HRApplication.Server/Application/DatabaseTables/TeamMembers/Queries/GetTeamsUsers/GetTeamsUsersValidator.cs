using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetTeamsUsers
{
    public class GetTeamsUsersValidator : AbstractValidator<GetTeamsUsersRequest>
    {
        public GetTeamsUsersValidator()
        {
            RuleFor(x => x.teamId)
              .NotEmpty().WithMessage("teamId is required")
              .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("teamId must be a valid GUID");
        }
    }
}
