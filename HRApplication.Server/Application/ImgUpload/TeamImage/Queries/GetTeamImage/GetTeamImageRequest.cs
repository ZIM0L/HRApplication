using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamImage
{
    public record GetTeamImageRequest(string teamId) : IRequest<ErrorOr<FileResult>>;
}
