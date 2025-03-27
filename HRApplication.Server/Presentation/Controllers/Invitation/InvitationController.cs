using ErrorOr;
using HRApplication.Server.Application.DatabaseTables;
using HRApplication.Server.Application.DatabaseTables.Invitations.Commands;
using HRApplication.Server.Application.DatabaseTables.Invitations.Commands.AcceptInvitation;
using HRApplication.Server.Application.DatabaseTables.Invitations.Commands.SendInvitation;
using HRApplication.Server.Application.DatabaseTables.Invitations.Queries.CheckIfAnyInvitationForUser;
using HRApplication.Server.Application.DatabaseTables.Invitations.Queries.GetTeamPendingInvitations;
using HRApplication.Server.Application.DatabaseTables.Invitations.Queries.GetUserInvitations;
using HRApplication.Server.Application.DatabaseTables.Queries.GetUserBySearch;
using HRApplication.Server.Domain.Models.UserSearchDTO;
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
    public class InvitationController : ErrorController
    {
        private readonly IMediator _mediator;
        public InvitationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("SendInvitation")]
        public async Task<IActionResult> AddJobPosition([FromBody] SendInvitationRequest request)
        {
            var command = new SendInvitationRequest(
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
        [HttpPost]
        [Route("SeachForUser")]
        public async Task<IActionResult> SeachForUser([FromBody] GetUserBySearchRequest request)
        {
            var command = new GetUserBySearchRequest(
                request.fullName,
                request?.email
                );

            ErrorOr<List<UserSearchDTO>> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
        [HttpGet]
        [Route("GetUserInvitation")]
        public async Task<IActionResult> GetUserInvitation()
        {
            var command = new GetUserInvitationsRequest();

            ErrorOr<List<InvitationResult>> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }  
        [HttpGet]
        [Route("CheckIfAnyInvitationForUser")]
        public async Task<IActionResult> CheckIfAnyInvitationForUser()
        {
            var command = new CheckIfAnyInvitationForUserRequest();

            ErrorOr<Boolean> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
        [HttpPost]
        [Route("AcceptInvitation")]
        public async Task<IActionResult> AcceptInvitation([FromBody] AcceptInvitationRequest request)
        {
            var command = new AcceptInvitationRequest(request.invitaitonId);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
            response => Ok("User has join a team"),
            errors => Problem(errors));
        }  
        [HttpDelete]
        [Route("DeclineInvitation/{invitationId}")]
        public async Task<IActionResult> DeclineInvitation(string invitationId)
        {
            var command = new DeclineInvitationRequest(invitationId);

            ErrorOr<Unit> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(),
            errors => Problem(errors));
        }
        [HttpPost]
        [Route("GetPendingInvitations")]
        public async Task<IActionResult> GetPendingInvitations(GetTeamPendingInvitationsRequest request)
        {
            var command = new GetTeamPendingInvitationsRequest(request.teamId);

            ErrorOr<List<InvitationResult>?> response = await _mediator.Send(command);

            return response.Match(
            response => Ok(response),
            errors => Problem(errors));
        }
    }
}
