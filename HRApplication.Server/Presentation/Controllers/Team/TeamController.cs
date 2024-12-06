using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries;
using HRApplication.Server.Application.DatabaseTables.Teams;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands;
using HRApplication.Server.Application.DatabaseTables.Teams.Queries;
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
        [Route("/api/[controller]/AddNewTeam")]
        public async Task<IActionResult> AddNewTeam([FromBody] TeamAddRequest request)
        {
            var command = new TeamAddRequest(request.name, request.country,request.phoneNumber);

            ErrorOr<TeamResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpGet]
        [Route("/api/[controller]/GetUsersTeams")]
        public async Task<IActionResult> GetTeams()
        {
            var command = new GetUsersTeamsRequest();

            ErrorOr<List<TeamResultWithUserPermission>> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }  
        [HttpGet]
        [Route("/api/[controller]/GetTeam")]
        public async Task<IActionResult> GetTeam()
        {
            var command = new GetTeamRequest();

            ErrorOr<TeamResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}
