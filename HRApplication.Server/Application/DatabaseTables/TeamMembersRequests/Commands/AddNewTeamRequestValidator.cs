using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands
{
    public class AddNewTeamRequestValidator : AbstractValidator<AddNewTeamRequestRequest>
    {
        public AddNewTeamRequestValidator()
        {
            RuleFor(x => x.teamId)
                .NotEmpty().WithMessage("TeamId is required.")
                .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID."); 

            RuleFor(request => request.title)
                .NotEmpty().WithMessage("Title is required.") 
                .Length(5, 50).WithMessage("Title must be between 5 and 50 characters.");

            RuleFor(request => request.requestContent)
                .NotEmpty().WithMessage("Request content is required.") 
                .Length(5, 500).WithMessage("Request content must be between 5 and 500 characters.");
        }
    }
}
