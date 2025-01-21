using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HRApplication.Server.Application.ImgUpload.GetUserImage
{
    public record GetUserImageRequest() : IRequest<ErrorOr<FileResult>>;
}
