using Application.Authentication;
using ErrorOr;
using HRApplication.Server.Application.Authentication.Commands;
using HRApplication.Server.Application.Authentication.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Authentication
{
    [Route("/auth")]
    public class AuthenticationController : ErrorController
    {
        private readonly IMediator _mediator;
        public AuthenticationController(IMediator mediator) {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("/auth/register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request) {

            var command = new RegisterRequest(
                request.name,
                request.surname,
                request.email,
                request.password,
                request.phone);

            ErrorOr<AuthenticationResult> response = await _mediator.Send(command); //pipieline

       
            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }
        [HttpPost]
        [Route("/auth/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {

            var query = new LoginRequest(
                request.email,
                request.password);

            ErrorOr<AuthenticationResult> response = await _mediator.Send(query); //pipieline


            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }
    }
}
