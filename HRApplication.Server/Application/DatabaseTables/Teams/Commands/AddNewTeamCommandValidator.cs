using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public class AddNewTeamCommandValidator : AbstractValidator<TeamAddRequest>
    {
        public AddNewTeamCommandValidator()
        {
            RuleFor(x => x.name).NotEmpty().WithMessage("Name is required");
        }
    }
}
