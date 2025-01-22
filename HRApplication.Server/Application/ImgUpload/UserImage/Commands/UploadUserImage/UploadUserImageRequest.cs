using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.ImgUpload.UserImage.Commands.UploadUserImage
{
    public record UploadUserImageRequest(IFormFile Image) : IRequest<ErrorOr<Unit>>
    {
    }
}
