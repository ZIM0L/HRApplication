using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AddTeamMember;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
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
        private readonly ITeamMemberRepository _teamMemberRepository;
        public AcceptInvitationHandler(IMediator mediator, IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor, IJobPositionsRepository jobPositionsRepository, ITeamRepository teamRepository, ITeamMemberRepository teamMemberRepository)
        {
            _mediator = mediator;
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
            _jobPositionsRepository = jobPositionsRepository;
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
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

            var AddTeamMember = new TeamMember(Guid.Parse(BearerCheckerResult.Value.Payload.Sub), jobPosition.TeamId, jobPosition.JobPositionId, "Employee");
            _teamMemberRepository.AddNewTeamMemberToCollection(AddTeamMember);

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
