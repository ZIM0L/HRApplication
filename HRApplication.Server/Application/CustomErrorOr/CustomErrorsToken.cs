using ErrorOr;
using System.Net;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
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
    }
}
