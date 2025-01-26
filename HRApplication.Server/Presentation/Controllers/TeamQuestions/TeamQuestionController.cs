using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;
using HRApplication.Server.Application.DatabaseTables.TeamQuestions;
using HRApplication.Server.Application.DatabaseTables.TeamQuestions.Queries;
using HRApplication.Server.Application.DatabaseTables.TeamQuestions.Commands.AddTeamQuestion;
using HRApplication.Server.Application.DatabaseTables.TeamQuestions.Commands.DeleteTeamQuestion;

namespace HRApplication.Server.Presentation.Controllers.TeamQuestions
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TeamQuestionController : ErrorController
    {
        private readonly IMediator _mediator;
        public TeamQuestionController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("AddTeamQuestion")]
        public async Task<IActionResult> AddTeamQuestion([FromBody] AddTeamQuestionRequest request)
        {
            var command = new AddTeamQuestionRequest(
                request.teamId,
                request.title,
                request.description,
                request.subQuestions);

            ErrorOr<TeamQuestionResult> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpPost]
        [Route("GetTeamQuestions")]
        public async Task<IActionResult> GetTeamQuestions([FromBody] GetTeamQuestionRequest request)
        {
            var command = new GetTeamQuestionRequest(
                request.teamId);

            ErrorOr<List<TeamQuestionResult>> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
        [HttpDelete]
        [Route("DeleteTeamQuestion/{teamQuestionId}")]
        public async Task<IActionResult> DeleteTeamQuestion(string teamQuestionId)
        {
            var command = new DeleteTeamQuestionRequest(
                teamQuestionId);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
                response => Ok(response),
                errors => Problem(errors)
                );
        }
    }
}
