using Azure.Core;
using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AssignTeamMemberRole;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AssignTeamRole;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.RemoveTeamMember;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.RemoveTeamMemberJobPosition;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.ToggleTeamMemberActivity;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetTeamsUsers;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetUsersTeams;
using HRApplication.Server.Application.DatabaseTables.Teams;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands.DisbandTeam;
using HRApplication.Server.Application.DatabaseTables.Teams.Queries.GetTeamInfo;
using HRApplication.Server.Domain.Models.UserDTO;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Teams
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TeamController : ErrorController
    {
        private readonly IMediator _mediatR;
        public TeamController(IMediator mediatR)
        {
            _mediatR = mediatR;
        }

        [HttpPost]
        [Route("AddNewTeam")]
        public async Task<IActionResult> AddNewTeam([FromBody] TeamAddRequest request)
        {
            var command = new TeamAddRequest(request.name, request.country, request.industry, request.email, request.city,request.zipCode, request.url, request.address, request.phoneNumber);

            ErrorOr<TeamResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpGet]
        [Route("GetUsersTeams")]
        public async Task<IActionResult> GetTeams()
        {
            var command = new GetUsersTeamsRequest();

            ErrorOr<List<TeamResultWithUserPermission>> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("GetTeamsUsers")]
        public async Task<IActionResult> GetTeamsUsers([FromBody] GetTeamsUsersRequest request)
        {
            var command = new GetTeamsUsersRequest(request.teamId);

            ErrorOr<List<UserDTO>> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("GetTeam")]
        public async Task<IActionResult> GetTeam([FromBody] GetTeamRequest request)
        {
            var command = new GetTeamRequest(request.teamId);

            ErrorOr<TeamResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }   
        [HttpPut]
        [Route("UpdateTeam/{teamId}")]
        public async Task<IActionResult> GetTeam([FromBody] UpdateTeamRequest request, string teamId)
        {
            var command = new UpdateTeamRequest(
                Guid.Parse(teamId),
                request.Name,
                request.Industry,
                request.Country,
                request.Url,
                request.Email,
                request.Address,
                request.City,
                request.PhoneNumber,
                request.ZipCode);

            ErrorOr<TeamResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }  
        [HttpDelete]
        [Route("DisbandTeam/{teamId}")]
        public async Task<IActionResult> DisbandTeam(string teamId)
        {
            var command = new DisbandTeamRequest(teamId);

            ErrorOr<Unit> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("DeleteTeamMember")]
        public async Task<IActionResult> DeleteTeamMember(RemoveTeamMemberRequest request)
        {
            var command = new RemoveTeamMemberRequest(request.teamId, request.email);

            ErrorOr<Unit> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("DeleteTeamMemberRole")]
        public async Task<IActionResult> DeleteTeamMemberRole(RemoveTeamMemberJobPositionRequest request)
        {
            var command = new RemoveTeamMemberJobPositionRequest(request.email, request.jobPosition, request.teamId);

            ErrorOr<Unit> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("AssignTeamMemberRole")]
        public async Task<IActionResult> DeleteTeamMemberRole(AssignTeamMemberRoleRequest request)
        {
            var command = new AssignTeamMemberRoleRequest(request.teamId, request.email, request.jobPosition);

            ErrorOr<UserDTO> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("ToggleTeamMemberActivity")]
        public async Task<IActionResult> ToggleTeamMemberActivity(ToggleTeamMemberActivityRequest request)
        {
            var command = new ToggleTeamMemberActivityRequest(request.teamId, request.email);

            ErrorOr<DateTime> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}
