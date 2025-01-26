using FluentValidation;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions.Commands.AddTeamQuestion
{
    public class AddTeamQuestionValidation : AbstractValidator<AddTeamQuestionRequest>
    {
        public AddTeamQuestionValidation()
        {
            RuleFor(request => request.teamId)
                 .NotEmpty().WithMessage("teamId Shift ID is required.")
                 .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("teamId must be a valid GUID.");

            RuleFor(request => request.title)
                .NotEmpty().WithMessage("Title cannot be empty.")
                .MaximumLength(255).WithMessage("Title cannot exceed 100 characters.");

            RuleFor(request => request.description)
                .NotEmpty().WithMessage("Description cannot be empty.")
                .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");

            When(request => request.subQuestions != null && request.subQuestions.Any(), () =>
            {
                RuleForEach(request => request.subQuestions)
                    .ChildRules(subQuestion =>
                    {
                        subQuestion.RuleFor(sub => sub.Key)
                            .NotEmpty().WithMessage("Subquestion title cannot be empty.")
                            .MaximumLength(255).WithMessage("Subquestion title cannot exceed 100 characters.");

                        subQuestion.RuleFor(sub => sub.Value)
                            .NotEmpty().WithMessage("Subquestion description cannot be empty.")
                            .MaximumLength(300).WithMessage("Subquestion description cannot exceed 300 characters.");
                    });
            });
        }
    }
}
