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
                code: "Calendar.CalendarDoesNotExists",
                description: "Calendar doesn't exist"
            ); 
            public static Error WrongPermission = Error.Conflict(
                code: "Calendar.WrongPermission",
                description: "Wrong permission has been given"
            ); 
            public static Error EventDoesNotExists = Error.Conflict(
                code: "Calendar.EventDoesNotExists",
                description: "Provided event doesn't exist"
            );
            public static Error InvalidaDateProvided = Error.Conflict(
               code: "Calendar.InvalidaDateProvided",
               description: "End date can't be earlier than start date"
            );
        }
    }
}
