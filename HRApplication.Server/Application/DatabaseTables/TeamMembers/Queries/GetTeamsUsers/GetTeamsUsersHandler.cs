using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Domain.Models.User;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;
using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetTeamsUsers
{
    public class GetTeamsUsersHandler : IRequestHandler<GetTeamsUsersRequest, ErrorOr<List<UserDTO>>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;
        public GetTeamsUsersHandler(ITeamRepository teamRepository, ITeamMemberRepository teamMemberRepository, IUserRepository userRepository)
        {
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<List<UserDTO>>> Handle(GetTeamsUsersRequest query, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            if(_teamRepository.GetTeamByTeamId(Guid.Parse(query.teamId)) is null)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }
            var teamMembers = _teamMemberRepository.GetTeamMembersByTeamIdFromCollection(Guid.Parse(query.teamId));
  
            if (teamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.NoMembersInTeam;
            }
            var userIds = teamMembers.Select(tm => tm.UserId).Distinct().ToList();

            var users = _userRepository.GetUsersByIds(userIds);
            if (users == null || !users.Any())
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            var userDTOs = teamMembers
                .Join(
                    users,
                    teamMember => teamMember.UserId,
                    user => user.UserId,
                    (teamMember, user) => new UserDTO(
                        user.Name,
                        user.Surname,
                        user.Email,
                        user.PhoneNumber)
                    {
                        JobPosition = teamMember.JobPositionId?.ToString() ?? string.Empty,
                        Permission = teamMember.RoleName,
                        JoinedAt = teamMember.JoinedAt,
                        LeftAt = teamMember.LeftAt,
                        isActive = teamMember.IsActive
                    }
                )
                .ToList();

            return userDTOs;

        }
    }
}
