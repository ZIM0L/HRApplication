using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.JobPosition.Queries.GetJobPositionsBasedOnTeams;
using HRApplication.Server.Application.DatabaseTables.JobPositions;
using HRApplication.Server.Application.DatabaseTables.JobPositions.Commands;
using HRApplication.Server.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.JobPositions
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class JobPositionController : ErrorController
    {
        private readonly IMediator _mediator;
        public JobPositionController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("/api/[controller]/addJobPosition")]
        public async Task<IActionResult> AddJobPosition([FromBody] JobPositionRequest request)
        {
            var command = new JobPositionRequest(
                request.teamId,
                request.title,
                request.description,
                request.isRecruiting
                );
            ErrorOr<JobPositionsResult> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
        
        [HttpPost]
        [Route("/api/[controller]/GetJobPositionsBasedOnTeams")]
        public async Task<IActionResult> GetJobPositionsBasedOnTeams([FromBody] GetJobPositionsBasedOnTeamsRequest request)
        {
            var query = new GetJobPositionsBasedOnTeamsRequest(request.teamId);

            ErrorOr<List<JobPositionsResult>> response = await _mediator.Send(query);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
    }
}
