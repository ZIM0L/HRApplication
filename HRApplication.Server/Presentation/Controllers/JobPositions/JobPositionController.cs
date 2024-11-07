using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.JobPositions;
using HRApplication.Server.Application.DatabaseTables.JobPositions.Commands;
using HRApplication.Server.Application.DatabaseTables.JobPositions.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.JobPositions
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
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
                request.title,
                request.description
                );
            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
        [HttpGet]
        [Route("/api/[controller]/getAllJobPositions")]
        public async Task<IActionResult> GetAllJobPositions()
        {        
            var query = new GetJobPositionsQuery();

            ErrorOr<List<JobPositionsResult>> response = await _mediator.Send(query);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
    }
}
