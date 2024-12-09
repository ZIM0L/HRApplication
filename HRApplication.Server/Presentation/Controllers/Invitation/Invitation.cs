using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Invitation.Commands;
using HRApplication.Server.Application.DatabaseTables.JobPositions.Commands;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Invitations
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class Invitation : ErrorController
    {
        private readonly IMediator _mediator;
        public Invitation(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("/api/[controller]/SendInvitation")]
        public async Task<IActionResult> AddJobPosition([FromBody] SendInvitationRequest request)
        {
            var command = new SendInvitationRequest(
                request.userid,
                request.jobpositionid,
                request.name,
                request.surname,
                request.email
                );

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
    }
}
