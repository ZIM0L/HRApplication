using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public class GetTeamsHnadler : IRequestHandler<TeamAddRequest, ErrorOr<TeamResult>>
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMediator _mediator;
        public GetTeamsHnadler(ITeamRepository teamRepository, IUserRepository userRepository, IMediator mediator)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _mediator = mediator;
        }
        public async Task<ErrorOr<TeamResult>> Handle(TeamAddRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            if (_userRepository.GetUserById(request.userId) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            if (!user.RoleName.Equals("Administrator"))
            {
                return CustomErrorOr.CustomErrors.User.UserNotAuthorized;
            }

            var team = new Team(request.name);

            if (_teamRepository.GetTeamsIdsByName(team.Name) is List<Team> teams)
            {
                foreach (var existingTeam in teams)
                {
                    if (existingTeam.TeamId.Equals(team))
                    {
                        team.TeamId = Guid.NewGuid();
                        break;
                    }
                }
            }

            _teamRepository.AddNewTeam(team);

            var command = new AddTeamMemberRequest(request.userId, team.TeamId);
            var addTeamMembertoCollectionResult = await _mediator.Send(command);

            if (addTeamMembertoCollectionResult.IsError)
            {
                // add if error, then delete team
                return addTeamMembertoCollectionResult.Errors;
            }

            return new TeamResult(team.Name,
                team.Industry,
                team.Country,
                team.Url,
                team.Email,
                team.Address,
                team.City,
                team.PhoneNumber);
        }
    }
}
