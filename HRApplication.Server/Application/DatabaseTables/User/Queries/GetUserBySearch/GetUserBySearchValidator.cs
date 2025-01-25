using FluentValidation;

namespace HRApplication.Server.Application.DatabaseTables.Queries.GetUserBySearch
{
    public class GetUserBySearchValidator : AbstractValidator<GetUserBySearchRequest>
    {
        public GetUserBySearchValidator()
        {
            RuleFor(x => x.fullName)
                    .NotEmpty().WithMessage("Full name cannot be empty.")
                    .Matches(@"^[a-zA-Z\s]+$").WithMessage("Full name should only contain letters and spaces.");


            RuleFor(x => x.email)
                .EmailAddress().WithMessage("Invalid email format.")
                .When(x => !string.IsNullOrEmpty(x.email));
        }
    }
}
