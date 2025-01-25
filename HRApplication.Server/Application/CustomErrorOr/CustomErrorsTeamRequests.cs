using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class TeamRequest
        {
            public static Error RequestDoesNotExists = Error.Conflict(
                code: "TeamRequest.RequestDoesNotExists",
                description: "Team member request doesn't exists");
            public static Error ForbiddenAction = Error.Forbidden(
                code: "TeamRequest.ForbiddenAction",
                description: "User cannot edit others requests");
            public static Error CannotResolve = Error.Conflict(
                code: "TeamRequest.CannotResolve",
                description: "Request is already resolved");
        }
    }
}
