using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;
using HRApplication.Server.Application.ImgUpload.UserImage.Commands.UploadUserImage;
using HRApplication.Server.Application.ImgUpload.TeamImage.Commands.TeamUserImage;
using HRApplication.Server.Application.ImgUpload.UserImage.Queries.GetUserImage;
using HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamImage;
using HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamsImages;

namespace HRApplication.Server.Presentation.Controllers.ImgUpload
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ImagesController : ErrorController
    {
        private readonly IMediator _mediator;
        public ImagesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("UploadTeamImage")]
        public async Task<IActionResult> UploadUserImage([FromForm] UploadTeamImageRequest request)
        {
            var command = new UploadTeamImageRequest(
            request.image, request.teamId);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
            );
        }
        [HttpPost]
        [Route("GetTeamImage")]
        public async Task<IActionResult> GetTeamImage([FromBody] GetTeamImageRequest request)
        {
            var command = new GetTeamImageRequest(
            request.teamId);

            ErrorOr<FileResult> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
            );
        }
        [HttpGet]
        [Route("GetTeamsImages")]
        public async Task<IActionResult> GetTeamsImages()
        {
            var command = new GetTeamsImagesRequest();

            ErrorOr<TeamsImagesResult?> response = await _mediator.Send(command);

            return response.Match(
                result => Ok(result), 
                errors => Problem(errors) 
            );
        }
        [HttpPost("UploadUserImage")]
        public async Task<IActionResult> UploadUserProfileImage([FromForm] UploadUserImageRequest request)
        {
            var command = new UploadUserImageRequest(
            request.Image);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
            );
        }
        [HttpGet("GetUserImage")]
        public async Task<IActionResult> GetUserImage()
        {
            var command = new GetUserImageRequest();
            ErrorOr<FileResult> response = await _mediator.Send(command);

            return response.Match(
               response => Ok(response),
               errors => Problem(errors)
           );
        }
    }
}
