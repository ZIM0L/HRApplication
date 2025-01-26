using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Queries
{
    public class GetTeamQuestionValidator :AbstractValidator<GetTeamQuestionRequest>
    {
        public GetTeamQuestionValidator()
        {

            RuleFor(request => request.teamId)
                 .NotEmpty().WithMessage("teamId Shift ID is required.")
                 .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("teamId must be a valid GUID.");
        }
    }
}
