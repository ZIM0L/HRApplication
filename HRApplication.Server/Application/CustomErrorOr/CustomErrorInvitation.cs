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
            public static Error WrongInvitationTarget = Error.Conflict(
                code: "Invitation.WrongInvitationUser",
                description: "An invitation can't be sent to the user who is the same as the sender"
            );
            public static Error InvitationDoesNotExist = Error.Conflict(
               code: "Invitation.InvitationDoesNotExist",
               description: "An invitation do not exists"
           );
        }

    }
}
