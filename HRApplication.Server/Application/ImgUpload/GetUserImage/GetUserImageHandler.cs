using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace HRApplication.Server.Application.ImgUpload.GetUserImage
{
    public class GetUserImageHandler : IRequestHandler<GetUserImageRequest, ErrorOr<FileResult>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetUserImageHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ErrorOr<FileResult>> Handle(GetUserImageRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
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

            var fileName = user.UserProfilePathImage;
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ProfilePictures", user.UserId.ToString());

            var filePath = string.IsNullOrEmpty(fileName)
                            ? Path.Combine(Directory.GetCurrentDirectory(), "ProfilePictures", "Default", "default-profile-photo.jpg")
                            : Path.Combine(uploadsFolder, fileName);

            if (!File.Exists(filePath))
            {
                filePath = Path.Combine(Directory.GetCurrentDirectory(), "ProfilePictures", "Default", "default-profile-photo.jpg");
            }

            byte[] fileBytes = File.ReadAllBytes(filePath);

                return new FileContentResult(fileBytes, "application/octet-stream")
                {
                    FileDownloadName = fileName 
                };
          
        }

    }
}
