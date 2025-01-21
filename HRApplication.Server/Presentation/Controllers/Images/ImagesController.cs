using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;
using HRApplication.Server.Application.ImgUpload.UploadUserImage;
using HRApplication.Server.Application.ImgUpload.GetUserImage;

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
        [HttpPost("UploadUserImage")]
        public async Task<IActionResult> UploadUserImage([FromForm] UploadImageRequest request)
        {
            var command = new UploadImageRequest(
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
