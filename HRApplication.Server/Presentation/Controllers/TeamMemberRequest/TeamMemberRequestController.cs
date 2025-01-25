using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands;
using HRApplication.Server.Application.DatabaseTables.Teams;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;
using HRApplication.Server.Application.DatabaseTables.TeamMembersRequests;
using HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Queries.GetTeamRequests;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.AddNewTeamRequest;
using HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.DeleteTeamRequest;
using HRApplication.Server.Application.DatabaseTables.TeamMembersRequests.Commands.ResolveTeamRequest;

namespace HRApplication.Server.Presentation.Controllers.TeamMemberRequest
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TeamMemberRequestController : ErrorController
    {
        private readonly IMediator _mediatR;
        public TeamMemberRequestController(IMediator mediatR)
        {
            _mediatR = mediatR;
        }
        [HttpPost]
        [Route("GetTeamMemberRequests")]
        public async Task<IActionResult> GetTeamMemberRequests([FromBody] GetTeamRequestsRequest request)
        {
            var command = new GetTeamRequestsRequest(request.teamId);

            ErrorOr<List<TeamRequestsResult>?> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("AddTeamMemberRequest")]
        public async Task<IActionResult> AddTeamMemberRequest([FromBody] AddNewTeamRequestRequest request)
        {
            var command = new AddNewTeamRequestRequest(request.teamId,request.title,request.requestContent);

            ErrorOr<TeamRequestsResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpDelete]
        [Route("DeleteTeamMemberRequest/{teammemberrequestid}")]
        public async Task<IActionResult> DeleteTeamMemberRequest(string teammemberrequestid)
        {
            var command = new DeleteTeamRequestRequest(teammemberrequestid);

            ErrorOr<Unit> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("ResolveTeamMemberRequest")]
        public async Task<IActionResult> ResolveTeamMemberRequest(ResolveTeamRequestRequest request)
        {
            var command = new ResolveTeamRequestRequest(request.teamMemberRequestId, request.answerContent);

            ErrorOr<Unit> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}
