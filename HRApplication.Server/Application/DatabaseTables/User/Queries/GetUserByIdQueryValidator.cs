using FluentValidation;

public class GetUserByIdQueryValidator : AbstractValidator<GetUserByIdQuery>
{
    public GetUserByIdQueryValidator()
    {
        RuleFor(x => x.id).NotEmpty().WithMessage("Empty Id request");
    }
}