using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamImage
{
    public class GetTeamImageValidation : AbstractValidator<GetTeamImageRequest>
    {
        public GetTeamImageValidation()
        {
            RuleFor(x => x.teamId)
            .NotEmpty().WithMessage("TeamId is required.")
            .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");
        }
    }
}
