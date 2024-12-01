using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class JobPosition
        {
            public static Error JobPositionAlreadyExists = Error.Conflict(
                code: "JobPosition.JobPositionAlreadyExixts",
                description: "Job position is already created"

            ); 
            public static Error NoJobPositionExists = Error.NotFound(
                code: "JobPosition.NoJobPositionExists",
                description: "There isn't any job position"
            );
            public static Error PositionAlreadyInTeam = Error.Conflict(
                code: "JobPosition.PositionAlreadyInTeam",
                description: "Position is already created in team"
            );
        }

    }
}
