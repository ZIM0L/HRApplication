using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;

namespace HRApplication.Server.Application.Utilities
{
    public static class IsAdministrator
    {
        public static ErrorOr<bool> CheckUser(ITeamMemberRepository teamMemberRepository, Guid teamId, string userId)
        {
            var userTeamMembers = teamMemberRepository.GetTeamMembersByTeamIdAndUserId(teamId, Guid.Parse(userId));

            if (userTeamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }

            var isUserAdministrator = userTeamMembers.FirstOrDefault(x => x.RoleName == "Administrator");

            if (isUserAdministrator == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserForbiddenAction;
            }

            return true;
        }
    }
}
