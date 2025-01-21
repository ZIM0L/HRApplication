using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.ImgUpload.UploadUserImage
{
    public record UploadImageRequest(IFormFile Image) : IRequest<ErrorOr<Unit>>
    {
    }
}
