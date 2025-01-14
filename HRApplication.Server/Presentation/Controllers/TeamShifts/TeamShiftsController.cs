using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands;
using HRApplication.Server.Application.DatabaseTables.Teams;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;
using HRApplication.Server.Application.DatabaseTables.TeamShifts.Queries.GetTeamShifts;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.CreateNewTeamShift;
using HRApplication.Server.Application.DatabaseTables.TeamShifts;
using HRApplication.Server.Application.DatabaseTables.TeamShifts.Commands.DeleteTeamShift;

namespace HRApplication.Server.Presentation.Controllers.TeamShifts
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TeamShiftsController : ErrorController
    {
        private readonly IMediator _mediator;
        public TeamShiftsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("/api/[controller]/GetTeamShifts")]
        public async Task<IActionResult> GetTeamShifts([FromBody] GetTeamShiftsRequest request)
        {
            var command = new GetTeamShiftsRequest(request.teamId);

            ErrorOr<List<TeamShiftResult>?> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        } 
        [HttpPost]
        [Route("/api/[controller]/CreateTeamShift")]
        public async Task<IActionResult> CreateTeamShift([FromBody] CreateNewTeamShiftRequest request)
        {
            var command = new CreateNewTeamShiftRequest(request.teamId,request.shiftStart,request.shiftEnd);

            ErrorOr<TeamShiftResult> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        } 
        [HttpDelete]
        [Route("/api/[controller]/DeleteTeamShift/{teamShiftId}")]
        public async Task<IActionResult> CreateTeamShift(string teamShiftId)
        {
            var command = new DeleteTeamShiftRequest(teamShiftId);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}
