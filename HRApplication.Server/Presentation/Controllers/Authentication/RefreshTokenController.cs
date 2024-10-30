using HRApplication.Server.Application.Authentication.Services.RefreshToken;
using MediatR;
using Microsoft.AspNetCore.Mvc;


public class RefreshTokenController : ControllerBase
{
    private readonly IMediator _mediator;

    public RefreshTokenController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("refresh-Token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var result = await _mediator.Send(request);

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