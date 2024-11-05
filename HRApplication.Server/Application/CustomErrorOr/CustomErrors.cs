using ErrorOr;
using System.Net;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class User
        {
            public static Error DuplicatedEmailError = Error.Conflict(
                description: "Email is already in use."
            );
            public static Error InvalidCredentials = Error.Conflict(
                description: "Invalid Credentials"
            );
            public static Error WrongPassword = Error.Conflict(
                description: "Entered Wrong Password"
            );
            public static Error InvalidRefreshToken = Error.Conflict(
                description: "User not found by Token"
            );
        }
        public static class Token
        {
            public static Error InvalidFormatError = Error.Unauthorized(
                code: "Token.InvalidFormat",
                description: "Invalid token format."
            );
            public static Error ExpiredError = Error.Unauthorized(
                code: "Token.Expired",
                description: "Token has expired"
            );
            public static Error InvalidSignatureError = Error.Unauthorized(
                code: "Token.InvalidSignature",
                description: "Token has an invalid signature"
            );
            public static Error InvalidRefreshToken = Error.Unauthorized(
                code: "Token.InvalidRefreshToken",
                description: "Refresh Token is invalid"
            );
        }
        public static class Role
        {
            public static Error NoRoleExists = Error.Conflict(
                code: "Role.NoRoleExists",
                description: "Role does not exists"
            );
        }

    }
}
