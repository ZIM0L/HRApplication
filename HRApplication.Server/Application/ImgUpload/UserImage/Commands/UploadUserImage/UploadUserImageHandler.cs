using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.ImgUpload.UserImage.Commands.UploadUserImage
{
    public class UploadTeamImageHandler : IRequestHandler<UploadUserImageRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public UploadTeamImageHandler(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<Unit>> Handle(UploadUserImageRequest request, CancellationToken cancellationToken)
        {
            if (request.Image == null || request.Image.Length == 0)
            {
                return CustomErrorOr.CustomErrors.Images.NoFileSend;
            }

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var bearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_userRepository.GetUserById(Guid.Parse(bearerCheckerResult.Value.Payload.Sub)) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ProfilePictures", user.UserId.ToString());
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var existingFiles = Directory.GetFiles(uploadsFolder);
            foreach (var file in existingFiles)
            {
                File.Delete(file);
            }

            var fileName = request.Image.FileName;
            var absoluteFilePath = Path.Combine(uploadsFolder, fileName);

            using (var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
            {
                await request.Image.CopyToAsync(fileStream);
            }

            user.UserProfilePathImage = fileName;
            _userRepository.UpdateUser(user);

            return Unit.Value;
        }
    }
}
