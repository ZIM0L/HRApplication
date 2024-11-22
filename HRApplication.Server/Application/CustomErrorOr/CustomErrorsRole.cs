using ErrorOr;

namespace HRApplication.Server.Application.CustomErrorOr
{
    public static partial class CustomErrors
    {
        public static class Role
        {
            public static Error NoRoleExists = Error.Conflict(
                code: "Role.NoRoleExists",
                description: "Role does not exists"
            );
        }

    }
}
