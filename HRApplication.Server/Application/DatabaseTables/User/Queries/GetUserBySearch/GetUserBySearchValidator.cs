using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.Queries.GetUserBySearch
{
    public class GetUserBySearchValidator : AbstractValidator<GetUserBySearchRequest>
    {
        public GetUserBySearchValidator()
        {
            RuleFor(x => x.fullName)
                    .NotEmpty().WithMessage("Full name cannot be empty.");

            RuleFor(x => x.email)
                .EmailAddress().WithMessage("Invalid email format.")
                .When(x => !string.IsNullOrEmpty(x.email));
        }
    }
}
