using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HRApplication.Server.Application.ImgUpload.UserImage.Queries.GetUserImage
{
    public record GetUserImageRequest() : IRequest<ErrorOr<FileResult>>;
}
