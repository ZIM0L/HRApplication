using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.JobPosition.Queries.GetJobPositionsBasedOnTeams
{
    public class GetJobPositionsBasedOnTeamsValidator : AbstractValidator<GetJobPositionsBasedOnTeamsRequest>
    {
        public GetJobPositionsBasedOnTeamsValidator()
        {
            RuleFor(x => x.teamId)
             .NotEmpty().WithMessage("TeamId is required")
             .Must(x => x != string.Empty).WithMessage("TeamId must be a valid GUID");
        }
    }
}
