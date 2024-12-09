using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Invitation
        {
            public static Error InvitationAlreadyCreated = Error.Conflict(
                code: "Invitation.InvitationAlreadyCreated",
                description: "Invitation has already been sent to this user"
            );
        }

    }
}
