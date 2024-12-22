using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Domain.Models.User;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;
using System.Data.Entity.Core.Metadata.Edm;
using static HRApplication.Server.Application.CustomErrorOr.CustomErrors;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Queries.GetTeamsUsers
{
    public class GetTeamsUsersHandler : IRequestHandler<GetTeamsUsersRequest, ErrorOr<List<UserDTO>>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;
        private readonly IJobPositionsRepository _jobPositionsRepository;
        public GetTeamsUsersHandler(ITeamRepository teamRepository, ITeamMemberRepository teamMemberRepository, IUserRepository userRepository, IJobPositionsRepository jobPositionsRepository)
        {
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _userRepository = userRepository;
            _jobPositionsRepository = jobPositionsRepository;
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

            var jobPositionIds = teamMembers
              .Where(tm => tm.JobPositionId.HasValue)
              .Select(tm => tm.JobPositionId.Value)
              .Distinct()
              .ToList();

            var jobPositions = _jobPositionsRepository.GetJobPositionsByIds(jobPositionIds);

            var userDTOs = teamMembers
             .Join(
                 users,
                 teamMember => teamMember.UserId,
                 user => user.UserId,
                 (teamMember, user) => new { teamMember, user }
             )
             .GroupJoin(
                 jobPositions,
                 result => result.teamMember.JobPositionId,
                 jobPosition => jobPosition.JobPositionId,
                 (result, jobPositionGroup) => new
                 {
                     result.teamMember,
                     result.user,
                     JobPositionTitle = jobPositionGroup.FirstOrDefault()?.Title ?? "Unknown"
                 }
             )
             .Select(mapped => new UserDTO(
                 mapped.user.Name,
                 mapped.user.Surname,
                 mapped.user.Email,
                 mapped.user.PhoneNumber)
             {
                 JobPosition = mapped.JobPositionTitle,
                 Permission = mapped.teamMember.RoleName,
                 JoinedAt = mapped.teamMember.JoinedAt,
                 LeftAt = mapped.teamMember.LeftAt,
                 isActive = mapped.teamMember.IsActive
             })
             .ToList();

            return userDTOs;

        }
    }
}
