using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Team
        {
            public static Error TeamAlreadyExists = Error.Conflict(
                code: "Team.TeamAlreadyExists",
                description: "Team with that Name already exists"
            );
            public static Error TeamMemeberAlreadyInCollection = Error.Conflict(
                code: "Team.TeamMemeberAlreadyInCollection",
                description: "User has already join team"
            );
            public static Error TeamNotFound = Error.NotFound(
               code: "Team.TeamNotFound",
               description: "Team does not exists"
            );
            public static Error UserAlreadyCreatedTeam = Error.Conflict(
              code: "Team.UserAlreadyCreatedTeam",
              description: "User already owns a team"
           );
        }
    }
}
