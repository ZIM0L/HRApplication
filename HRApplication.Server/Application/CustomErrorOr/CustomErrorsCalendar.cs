using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Calendar
        {
            public static Error CategoryDoesNotExists = Error.Conflict(
                code: "Calendar.CategoryDoesNotExists",
                description: "Provided category doesn't exist"
            ); 
            public static Error CalendarDoesNotExists = Error.Conflict(
                code: "Calendar.CategoryDoesNotExists",
                description: "Calendar doesn't exist"
            ); 
            public static Error WrongPermission = Error.Conflict(
                code: "Calendar.CategoryDoesNotExists",
                description: "Wrong permission has been given"
            ); 
            public static Error EventDoesNotExists = Error.Conflict(
                code: "Calendar.CategoryDoesNotExists",
                description: "Provided event doesn't exist"
            );
        }
    }
}
