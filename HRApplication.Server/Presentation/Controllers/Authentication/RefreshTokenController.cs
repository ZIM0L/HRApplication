using HRApplication.Server.Application.Authentication.Services.RefreshToken;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

public class RefreshTokenController : ErrorController
{
    private readonly IMediator _mediator;

    public RefreshTokenController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Route("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        var result = await _mediator.Send(new RefreshTokenRequest());

        if (result.IsError)
        {
            return Unauthorized(result.Errors);
        }
        var authResult = result.Value;
        return Ok(new
        {
            AccessToken = authResult.token,
        });
    }
}