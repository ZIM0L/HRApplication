using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamsImages
{
    public record GetTeamsImagesRequest() : IRequest<ErrorOr<TeamsImagesResult?>>;

}
