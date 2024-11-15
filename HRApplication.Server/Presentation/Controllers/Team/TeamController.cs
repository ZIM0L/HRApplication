using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Teams;
using HRApplication.Server.Application.DatabaseTables.Teams.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Team
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
        public async Task<IActionResult> AddNewTeam([FromBody] TeamRequest request)
        {
            var command = new TeamRequest(request.name, request.userId);

            ErrorOr<TeamResult> response = await _mediatR.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}
