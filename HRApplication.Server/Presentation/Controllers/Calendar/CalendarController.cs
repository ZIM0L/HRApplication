using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Commands;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Calendar
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CalendarController : ErrorController
    {
    private IMediator _mediator;
        public CalendarController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("/api/[controller]/CreateCalendarTEST")]
        public async Task<IActionResult> CreateCalendarTEST([FromBody] CreateCalendarRequest request)
        {

            var command = new CreateCalendarRequest(
                request.teamId);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );

        }
    }
}
