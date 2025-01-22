using FluentValidation;

namespace HRApplication.Server.Application.ImgUpload.UserImage.Commands.UploadUserImage
{
    public class UploadTeamImageValidation : AbstractValidator<IFormFile>
    {
        public UploadTeamImageValidation()
        {
            RuleFor(x => x)
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
