using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Images
        {
            public static Error NoFileSend = Error.Conflict(
                code: "Image.NoFileSend",
                description: "No file has been sent"
            );
            public static Error NoFileFound = Error.Conflict(
               code: "Image.NoFileFound",
               description: "No profile picture has been found"
           );
            public static Error WrongFormat = Error.Conflict(
                code: "Image.WrongFormat",
                description: "Wrong file format"
            );
            public static Error ImgTooBig = Error.Conflict(
                code: "Image.ImgTooBig",
                description: "The image may not have dimensions larger than 2048x2048"
            );
        }
    }
}
