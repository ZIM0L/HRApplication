using FluentValidation;
using HRApplication.Server.Application.ImgUpload.TeamImage.Commands.TeamUserImage;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.TeamImage.ImgUpload.TeamUserImage.Commands.UploadTeamImage
{
    public class UploadTeamImageValidation : AbstractValidator<UploadTeamImageRequest>
    {
        public UploadTeamImageValidation()
        {
            RuleFor(x => x.teamId)
              .NotEmpty().WithMessage("TeamId is required.")
              .Must(GuidValidator.IsValidGuid).WithMessage("TeamId must be a valid GUID.");

            RuleFor(x => x.image)
                .NotNull().WithMessage("File is needed")
                .Must(BeAValidFile).WithMessage("Valid formats are: jpg, jpeg, png")
                .Must(HaveValidDimensions).WithMessage("The image may not have dimensions larger than 2048x2048")
                .Must(NotExceedFileSize).WithMessage("File can not exceed 5MB");
        }

        private bool BeAValidFile(IFormFile file)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName).ToLower();
            return Array.Exists(allowedExtensions, ext => ext == extension);
        }

        private bool HaveValidDimensions(IFormFile file)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                stream.Position = 0;
                using (var img = SixLabors.ImageSharp.Image.Load(stream))
                {
                    return img.Width <= 2048 && img.Height <= 2048;
                }
            }
        }

        private bool NotExceedFileSize(IFormFile file)
        {
            return file.Length <= 5 * 1024 * 1024; // 5MB
        }
    }
}
