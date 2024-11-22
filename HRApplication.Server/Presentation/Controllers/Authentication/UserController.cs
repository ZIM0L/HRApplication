using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Authentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ErrorController
    {
        private IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("/api/[controller]/GetUsersRoleById")]
        public async Task<IActionResult> GetUsersRoleById([FromBody] GetUserByIdQuery request)
        {

            var query = new GetUserByIdQuery(
                request.id);

            ErrorOr<User> response = await _mediator.Send(query);

            return response.Match(
                response => Ok(response.RoleName),
                errors => Problem(errors)
                );

        }
    }
}
