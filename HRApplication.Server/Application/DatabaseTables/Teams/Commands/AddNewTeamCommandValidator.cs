using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public class GetTeamValidator : AbstractValidator<TeamAddRequest>
    {
        public GetTeamValidator()
        {
            RuleFor(x => x.name).NotEmpty().WithMessage("Name is required");
        }
    }
}
