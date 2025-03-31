using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Commands.ChangePassword;
using HRApplication.Server.Application.DatabaseTables.Commands.ChangeUserCredentials;
using HRApplication.Server.Application.DatabaseTables.Commands.ForgetPassword;
using HRApplication.Server.Application.DatabaseTables.Commands.ResetPassword;
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
        [Route("GetUsersRoleById")]
        public async Task<IActionResult> GetUsersRoleById([FromBody] GetUserByIdQuery request)
        {

            var query = new GetUserByIdQuery(
                request.UserId);

            ErrorOr<User> response = await _mediator.Send(query);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }  
        [HttpPost]
        [Route("ChangeUserCredential")]
        public async Task<IActionResult> ChangeUserCredential([FromBody] ChangeUserCredentialsRequest request)
        {

            var query = new ChangeUserCredentialsRequest(
                request.name, request.surname, request.email, request.phoneNumber, request.password);

            ErrorOr<Unit> response = await _mediator.Send(query);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }
        [HttpPut]
        [Route("ChangeUserPassword")]
        public async Task<IActionResult> ChangeUserPassword([FromBody] ChangePasswordRequest request)
        {

            var query = new ChangePasswordRequest(request.password, request.newPassword);

            ErrorOr<Unit> response = await _mediator.Send(query);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }
        [HttpPost]
        [Route("auth/ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgetPasswordRequest request)
        {

            var command = new ForgetPasswordRequest(request.email);

            ErrorOr<bool> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("auth/ResetPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ResetPasswordRequest request)
        {

            var command = new ResetPasswordRequest(request.token, request.newPassword);

            ErrorOr<bool> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }
    }
}
