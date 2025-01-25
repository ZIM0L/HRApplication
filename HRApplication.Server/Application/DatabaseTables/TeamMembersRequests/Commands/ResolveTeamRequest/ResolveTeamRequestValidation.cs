using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.ResolveTeamRequest
{
    public class ResolveTeamRequestValidation : AbstractValidator<ResolveTeamRequestRequest>
    {
        public ResolveTeamRequestValidation()
        {
            RuleFor(x => x.teamMemberRequestId)
               .NotEmpty().WithMessage("RequestId is required.")
               .Must(GuidValidator.IsValidGuid).WithMessage("RequestId must be a valid GUID.");

            RuleFor(x => x.answerContent)
                        .Must(content => content == null || !string.IsNullOrWhiteSpace(content))
                        .WithMessage("Answer content cannot be empty if provided.");
        }
    }
}
