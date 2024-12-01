using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Teams.Queries;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public class GetTeamsHnadler : IRequestHandler<GetTeamRequest, ErrorOr<TeamResult>>
    {
        private readonly ITeamRepository _teamRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor; 
        public GetTeamsHnadler(ITeamRepository teamRepository, IUserRepository userRepository, ITeamMemberRepository teamMemberRepository, IHttpContextAccessor httpContextAccessor)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _teamMemberRepository = teamMemberRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<TeamResult>> Handle(GetTeamRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_userRepository.GetUserById(Guid.Parse(BearerCheckerResult.Value.Payload.Sub)) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            if (_teamMemberRepository.GetTeamMemberByUserIdFromCollection(user.UserId) is not TeamMember teamMember)
            {
                return CustomErrorOr.CustomErrors.Team.UserWithoutTeam;
            }

            var team = _teamRepository.GetTeamById(teamMember.TeamId);
            if (team == null)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound; 
            }

            return new TeamResult(
                team.Name,
                team.Industry,
                team.Country,
                team.Url,
                team.Email,
                team.Address,
                team.City,
                team.PhoneNumber,
                team.ZipCode
                );
        }
    }
}
