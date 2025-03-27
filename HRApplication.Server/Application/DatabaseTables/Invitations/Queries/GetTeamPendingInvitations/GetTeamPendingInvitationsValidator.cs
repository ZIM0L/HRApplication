using FluentValidation;
using HRApplication.Server.Application.Utilities;

namespace HRApplication.Server.Application.DatabaseTables.Invitations.Queries.GetTeamPendingInvitations
{
    public class GetTeamPendingInvitationsValidator : AbstractValidator<GetTeamPendingInvitationsRequest>
    {
        public GetTeamPendingInvitationsValidator()
        {

            RuleFor(x => x.teamId)
                .NotEmpty().WithMessage("TeamId is required")
                .Must(x => GuidValidator.IsValidGuid(x)).WithMessage("TeamId must be a valid GUID");
        }
    }
}
