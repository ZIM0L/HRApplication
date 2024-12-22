using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands.SendInvitation
{
    public class SendInvitationHandler : IRequestHandler<SendInvitationRequest, ErrorOr<Unit>>
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IJobPositionsRepository _jobPositionsRepository;

        public SendInvitationHandler(IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, IJobPositionsRepository jobPositionsRepository)
        {
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _jobPositionsRepository = jobPositionsRepository;
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

            if (_userRepository.GetUserByEmail(command.email) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            if (_jobPositionsRepository.GetJobPositionById(Guid.Parse(command.jobpositionid)) is not Domain.Models.JobPosition)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }

            var invitation = new Domain.Models.Invitation(user.UserId, Guid.Parse(BearerCheckerResult.Value.Payload.Sub), Guid.Parse(command.jobpositionid));

            if(invitation.UserId == invitation.SendByUserId)
            {
                return CustomErrorOr.CustomErrors.Invitation.WrongInvitationTarget;
            }

            if (_invitationRepository.IsInvitationAlreadyCreated(invitation) is Domain.Models.Invitation)
            {
                return CustomErrorOr.CustomErrors.Invitation.InvitationAlreadyCreated;
            }

            _invitationRepository.AddInvitation(invitation);

            return Unit.Value;
        }
    }
}
