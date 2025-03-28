using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class User
        {
            public static Error DuplicatedEmailError = Error.Conflict(
                code: "User.DuplicatedEmailError",
                description: "Email is already in use."
            );
            public static Error InvalidCredentials = Error.Conflict(
                code: "User.InvalidCredentials",
                description: "Invalid Credentials"
            );
            public static Error WrongPassword = Error.Conflict(
                code: "User.WrongPassword",
                description: "Entered Wrong Password"
            );
            public static Error InvalidRefreshToken = Error.Conflict(
                code: "User.InvalidRefreshToken",
                description: "User not found by Token"
            );   
            public static Error ExpiredRefreshToken = Error.Conflict(
                code: "User.InvalidRefreshToken",
                description: "Users refresh token has expired"
            );
            public static Error UserNotFound = Error.NotFound(
                code: "User.UserNotFound",
                description: "User not found"
            );
            public static Error UserNotAuthorized = Error.Forbidden(
                code: "User.UserNotAuthorized",
                description: "User is unauthorized to do action"
            );
            public static Error UsersTokenModified = Error.Conflict(
                code: "User.UserModified",
                description: "Token has been modified"
            );
            public static Error InvalidPassword = Error.Conflict(
                code: "User.InvalidPassword",
                description: "Invalid Password"
            );
        }
    }
}
