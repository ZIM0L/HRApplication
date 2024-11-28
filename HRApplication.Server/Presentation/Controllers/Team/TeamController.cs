using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Teams;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands;
using HRApplication.Server.Application.DatabaseTables.Teams.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Teams
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
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
            var command = new TeamAddRequest(request.name, request.userId);

            ErrorOr<TeamResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpGet]
        [Route("/api/[controller]/GetTeams")]
        public async Task<IActionResult> GetTeams()
        {
            var command = new GetTeamsRequest();

            ErrorOr<List<TeamResult>> response = await _mediatR.Send(command);

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
