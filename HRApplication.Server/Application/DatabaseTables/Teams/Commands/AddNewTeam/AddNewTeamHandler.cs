using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.Commands;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AddTeamMember;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands.AddNewTeam
{
    public class AddNewTeamHandler : IRequestHandler<TeamAddRequest, ErrorOr<TeamResult>>
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMediator _mediator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public AddNewTeamHandler(ITeamRepository teamRepository, IUserRepository userRepository, IMediator mediator, IHttpContextAccessor httpContextAccessor, ITeamsCalendarRepository teamsCalendarRepository, ITeamMemberRepository teamMemberRepository)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _mediator = mediator;
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
        }
        public async Task<ErrorOr<TeamResult>> Handle(TeamAddRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var user = _userRepository.GetUserById(Guid.Parse(BearerCheckerResult.Value.Payload.Sub));

            if (user is not User)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            var team = new Team(request.name, request.country, request.industry, request.email);
            team.Email = request.email;
            team.City = request.city;
            team.Country = request.country;
            team.Url = request.url;
            team.PhoneNumber = request.phoneNumber;
            team.ZipCode = request.zipCode;

            if(_teamRepository.GetTeamByName(team.Name) is Team)
            {
                return CustomErrorOr.CustomErrors.Team.TeamAlreadyExistsInUserCollection;
            }

            _teamRepository.AddNewTeam(team);

            var teamAdmin = new TeamMember(user.UserId, team.TeamId, null, "Administrator");
            _teamMemberRepository.AddNewTeamMemberToCollection(teamAdmin);

            await _mediator.Send(new CreateCalendarRequest(team.TeamId));

            return new TeamResult(
                team.Name,
                team.Industry,
                team.Country,
                team.Url,
                team.Email,
                team.Address,
                team.City,
                team.PhoneNumber,
                team.ZipCode);
        }
    }
}
