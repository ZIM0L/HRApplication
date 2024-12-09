using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Invitation.Commands;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Commands
{
    public class SendInvitationHandler : IRequestHandler<SendInvitationRequest, ErrorOr<Unit>>
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public SendInvitationHandler(IInvitationRepository invitationRepository, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
        {
            _invitationRepository = invitationRepository;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
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

            if(_userRepository.GetUserById(Guid.Parse(command.userid)) is not User)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            var invitation = new Domain.Models.Invitation(Guid.Parse(command.userid),Guid.Parse(BearerCheckerResult.Value.Payload.Sub), Guid.Parse(command.jobpositionid));

            if(_invitationRepository.IsInvitationAlreadyCreated(invitation) is Domain.Models.Invitation)
            {
                return CustomErrorOr.CustomErrors.Invitation.InvitationAlreadyCreated;
            }

            _invitationRepository.AddInvitation(invitation);

            return Unit.Value;
        }
    }
}
