using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class TeamRequest
        {
            public static Error RequestDoesNotExists = Error.Unauthorized(
                code: "TeamRequest.RequestDoesNotExists",
                description: "Team member request doesn't exists");
            public static Error ForbiddenAction = Error.Unauthorized(
                code: "TeamRequest.ForbiddenAction",
                description: "User cannot edit others requests");
        }
    }
}
