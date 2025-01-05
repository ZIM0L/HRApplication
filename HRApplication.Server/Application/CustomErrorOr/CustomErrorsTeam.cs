using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Team
        {
            public static Error TeamAlreadyExistsInUserCollection = Error.Conflict(
                code: "Team.TeamAlreadyExists",
                description: "Team with given name already exists in your collection"
            );
            public static Error UserDoesntBelongToTeam = Error.Conflict(
                code: "Team.UserDoesntBelongToTeam",
                description: "User doesn't belong to this team"
            );
            public static Error TeamMemeberAlreadyInCollection = Error.Conflict(
                code: "Team.TeamMemeberAlreadyInCollection",
                description: "User has already join team"
            );
            public static Error TeamNotFound = Error.NotFound(
               code: "Team.TeamNotFound",
               description: "Team does not exists"
            );
            public static Error NoMembersInTeam = Error.NotFound(
               code: "Team.NoMembersInTeam",
               description: "Team does not have any memeber"
            );
            public static Error UserAlreadyCreatedTeam = Error.Conflict(
              code: "Team.UserAlreadyCreatedTeam",
              description: "User already owns a team"
            );
            public static Error NoTeamFound = Error.Conflict(
              code: "Team.NoTeamFound",
              description: "No teams in database"
            );
            public static Error UserWithoutTeam = Error.Conflict(
              code: "Team.UserWithoutTeam",
              description: "User is not assigned to any team"
            );
            public static Error UserForbiddenAction = Error.Forbidden(
              code: "Team.UserForbiddenAction",
              description: "User is forbidden to do this action"
            );
        }
    }
}
