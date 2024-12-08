using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetTeamsUsers
{
    public class GetTeamsUsersValidator : AbstractValidator<GetTeamsUsersRequest>
    {
        public GetTeamsUsersValidator()
        {
            RuleFor(x => x.teamId)
               .NotEmpty().WithMessage("TeamId is required")
               .Must(x => x != string.Empty).WithMessage("TeamId must be a valid GUID");
        }
    }
}
