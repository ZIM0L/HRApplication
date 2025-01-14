using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Shift
        {
            public static Error ShiftAlreadyExists = Error.Conflict(
                code: "Shift.ShiftAlreadyExists",
                description: "The provided shift timestamp is already in the collection"
            ); 
            public static Error ShiftDoesnotExists = Error.Conflict(
                code: "Shift.ShiftDoesnotExists",
                description: "Shift doesn't exists in the collection"
            );
        }

    }
}
