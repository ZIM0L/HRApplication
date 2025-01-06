using FluentValidation;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands;

public class UpdateTeamRequestValidator : AbstractValidator<UpdateTeamRequest>
{
    public UpdateTeamRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Team name cannot be empty.") 
            .MaximumLength(100).WithMessage("Team name cannot exceed 100 characters.")
            .When(x => !string.IsNullOrEmpty(x.Name)); 

        RuleFor(x => x.Industry)
            .NotEmpty().WithMessage("Industry cannot be empty.")
            .MaximumLength(50).WithMessage("Industry cannot exceed 50 characters.")
            .When(x => !string.IsNullOrEmpty(x.Industry));

        RuleFor(x => x.Country)
            .NotEmpty().WithMessage("Country cannot be empty.")
            .MaximumLength(50).WithMessage("Country cannot exceed 50 characters.")
            .When(x => !string.IsNullOrEmpty(x.Country));

        RuleFor(x => x.Url)
            .Matches(@"^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//").WithMessage("Invalid URL format.")
            .When(x => !string.IsNullOrEmpty(x.Url)); 

        RuleFor(x => x.Email)
            .EmailAddress().WithMessage("Invalid email format.")
            .When(x => !string.IsNullOrEmpty(x.Email)); 

        // Walidacja dla Address
        RuleFor(x => x.Address)
            .MaximumLength(255).WithMessage("Address cannot exceed 200 characters.")
            .When(x => !string.IsNullOrEmpty(x.Address));

        // Walidacja dla City
        RuleFor(x => x.City)
            .MaximumLength(100).WithMessage("City cannot exceed 100 characters.")
            .When(x => !string.IsNullOrEmpty(x.City)); 

        // Walidacja dla PhoneNumber
        RuleFor(x => x.PhoneNumber)
            .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Invalid phone number format.")
            .MaximumLength(15).WithMessage("Phone number exceed 15 characters.")
            .When(x => !string.IsNullOrEmpty(x.PhoneNumber)); 

        // Walidacja dla ZipCode
        RuleFor(x => x.ZipCode)
            .Matches(@"^\d{5}(-\d{4})?$").WithMessage("Invalid zip code format.")
             .MaximumLength(10).WithMessage("Zip Code exceed 10 characters.")
            .When(x => !string.IsNullOrEmpty(x.ZipCode));
    }
}
