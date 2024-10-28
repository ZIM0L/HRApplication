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
        }
    }
}
