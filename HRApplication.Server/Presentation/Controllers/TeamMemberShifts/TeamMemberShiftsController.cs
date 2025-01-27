using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamShifts.Queries.GetTeamShifts;
using HRApplication.Server.Application.DatabaseTables.TeamShifts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;
using MediatR;
using HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Queries;
using HRApplication.Server.Application.DatabaseTables.TeamMemberShifts;
using HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands.CreateTeamMemberShift;
using HRApplication.Server.Application.DatabaseTables.TeamMemberShifts.Commands.DeleteTeamMemberShift;

namespace HRApplication.Server.Presentation.Controllers.TeamMemberShifts
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TeamMemberShiftsController : ErrorController
    {
        private readonly IMediator _mediator;
        public TeamMemberShiftsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("GetTeamMembersShifts")]
        public async Task<IActionResult> GetTeamShifts([FromBody] GetTeamMemberShiftsRequest request)
        {
            var command = new GetTeamMemberShiftsRequest(request.teamId);

            ErrorOr<List<TeamMemberShiftResult>?> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("CreateTeamMemberShifts")]
        public async Task<IActionResult> CreateTeamMemberShifts([FromBody] CreateTeamMemberShiftsRequest request)
        {
            var command = new CreateTeamMemberShiftsRequest(request.email,request.teamShiftId,request.teamMemberShiftsDates);

            ErrorOr<List<TeamMemberShiftResult>> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("DeleteTeamMemberShift")]
        public async Task<IActionResult> DeleteTeamMemberShift([FromBody] DeleteTeamMemberShiftRequest request)
        {
            var command = new DeleteTeamMemberShiftRequest(request.teamShiftId, request.email, request.date);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}


