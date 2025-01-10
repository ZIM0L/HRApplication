using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.CalendarEvents;
using HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.CreateCalendarEvents;
using HRApplication.Server.Application.DatabaseTables.CalendarEvents.Commands.DeleteCalendarEvent;
using HRApplication.Server.Application.DatabaseTables.CalendarEvents.Queries;
using HRApplication.Server.Application.DatabaseTables.Commands;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.CallendarEvents
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CalendarEventsController : ErrorController
    {
        private readonly IMediator _mediator;
        public CalendarEventsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("/api/[controller]/CreateCalendarEvent")]
        public async Task<IActionResult> CreateCalendarEvent([FromBody] CreateCalendarEventsRequest request)
        {
            var command = new CreateCalendarEventsRequest(
                request.teamId,
                request.startDate,
                request.endDate,
                request.title,
                request.description,
                request.location,
                request.category,
                request.permission,
                request.teamTaskId);

            ErrorOr<CalendarEventResult> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("/api/[controller]/GetCalendarEvents")]
        public async Task<IActionResult> GetCalendarEvents([FromBody] GetCalendarEventsRequest request)
        {
            var command = new GetCalendarEventsRequest(request.teamId);

            ErrorOr<List<CalendarEventResult>?> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        } 
        [HttpDelete]
        [Route("/api/[controller]/DeleteCalendarEvent/{calendareventid}")]
        public async Task<IActionResult> DeleteCalendarEvent(string calendareventid)
        {
            var command = new DeleteCalendarEventRequest(calendareventid);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}
