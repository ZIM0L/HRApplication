using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Questions
        {
            public static Error QuestionsDoesnotExists = Error.Conflict(
                code: "Error.QuestionsDoesnotExists",
                description: "Question doesn't exist"
            );

        }
    }
}
