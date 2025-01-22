using ErrorOr;
using MediatR;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Commands.TeamUserImage
{
    public record UploadTeamImageRequest(IFormFile image, string teamId) : IRequest<ErrorOr<Unit>>
    {
    }
}
