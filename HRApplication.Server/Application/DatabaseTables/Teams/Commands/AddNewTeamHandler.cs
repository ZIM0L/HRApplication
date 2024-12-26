using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public class AddNewTeamHandler : IRequestHandler<TeamAddRequest, ErrorOr<TeamResult>>
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMediator _mediator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AddNewTeamHandler(ITeamRepository teamRepository, IUserRepository userRepository, IMediator mediator, IHttpContextAccessor httpContextAccessor, ITeamsCalendarRepository teamsCalendarRepository)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _mediator = mediator;
            _httpContextAccessor = httpContextAccessor;
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

            if (user is not User )
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }

            var team = new Team(request.name,request.country, request.industry, request.email);
                team.Email = request.email;
                team.City = request.city;
                team.Country = request.country;
                team.Url = request.url;
                team.PhoneNumber = request.phoneNumber;
                team.ZipCode = request.zipCode;

            _teamRepository.AddNewTeam(team);

            var command = new AddTeamMemberRequest(user.UserId, team.TeamId, null, "Administrator");
            var addTeamMembertoCollectionResult = await _mediator.Send(command);

            if (addTeamMembertoCollectionResult.IsError)
            {
                // add if error, then delete team
                return addTeamMembertoCollectionResult.Errors;
            }
            await _mediator.Send(new TeamsCalendar(team.TeamId));

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
