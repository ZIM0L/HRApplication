using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.SendInvitation
{
    public class SendInvitationHandler : IRequestHandler<SendInvitationRequest, ErrorOr<Unit>>
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;

        public SendInvitationHandler(IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, IJobPositionsRepository jobPositionsRepository, ITeamMemberRepository teamMemberRepository)
        {
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _jobPositionsRepository = jobPositionsRepository;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(SendInvitationRequest command, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_userRepository.GetUserByEmail(command.email) is not User userSendTo)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            var jobPosition = _jobPositionsRepository.GetJobPositionById(Guid.Parse(command.jobpositionid));

            if(jobPosition == null)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, jobPosition.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }

            if (_teamMemberRepository.GetTeamMemberByUserIdAndJobPositionId(jobPosition.JobPositionId, userSendTo.UserId) is TeamMember)
            {
                return CustomErrorOr.CustomErrors.Invitation.UserAlreadyOccupyingPosition;
            }

            var invitation = new Invitation(userSendTo.UserId, Guid.Parse(BearerCheckerResult.Value.Payload.Sub), jobPosition.JobPositionId);

            if(invitation.UserId == invitation.SendByUserId)
            {
                return CustomErrorOr.CustomErrors.Invitation.WrongInvitationTarget;
            }

            if (_invitationRepository.IsInvitationAlreadyCreated(invitation) is Invitation)
            {
                return CustomErrorOr.CustomErrors.Invitation.InvitationAlreadyCreated;
            }

            _invitationRepository.AddInvitation(invitation);

            return Unit.Value;
        }
    }
}
