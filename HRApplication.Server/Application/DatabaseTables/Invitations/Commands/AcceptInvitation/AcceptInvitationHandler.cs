using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AddTeamMember;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.AcceptInvitation
{
    public class AcceptInvitationHandler : IRequestHandler<AcceptInvitationRequest, ErrorOr<Unit>>
    {
        private readonly IMediator _mediator;
        private readonly IInvitationRepository _invitationRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly ITeamRepository _teamRepository;
        public AcceptInvitationHandler(IMediator mediator, IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor, IJobPositionsRepository jobPositionsRepository, ITeamRepository teamRepository)
        {
            _mediator = mediator;
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
            _jobPositionsRepository = jobPositionsRepository;
            _teamRepository = teamRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(AcceptInvitationRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if(_invitationRepository.GetInvitationById(Guid.Parse(request.invitaitonId)) is not Invitation invitation)
            {
                return CustomErrorOr.CustomErrors.Invitation.InvitationDoesNotExist;
            }
            var jobPosition = _jobPositionsRepository.GetJobPositionById(invitation.JobPositionId);

            if (jobPosition == null) {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            if(_teamRepository.GetTeamByTeamId(jobPosition.TeamId) is null)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }

            var AddTeamMemberCommand = new AddTeamMemberRequest(Guid.Parse(BearerCheckerResult.Value.Payload.Sub), jobPosition.TeamId, jobPosition.JobPositionId, "Employee");

            var resultAddTeamMemberCommand = await _mediator.Send(AddTeamMemberCommand);

            if (resultAddTeamMemberCommand.IsError)
            {
                return resultAddTeamMemberCommand.Errors;
            }

            var resultDeleteInvitationCommand = await _mediator.Send(new DeclineInvitationRequest(invitation.InvitationId.ToString()));
            
            if (resultDeleteInvitationCommand.IsError)
            {
                // pipiline to delete teammember later
                return resultDeleteInvitationCommand.Errors;
            }


            return Unit.Value;
        }
    }
}
