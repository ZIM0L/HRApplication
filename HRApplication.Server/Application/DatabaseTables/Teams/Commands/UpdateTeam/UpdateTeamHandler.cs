using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;
using Team = HRApplication.Server.Domain.Models.Team;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands.UpdateTeam
{
    public class UpdateTeamHandler : IRequestHandler< UpdateTeamRequest, ErrorOr<TeamResult>>
    {
        private readonly ITeamRepository _teamRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateTeamHandler(ITeamRepository teamRepository, ITeamMemberRepository teamMemberRepository, IHttpContextAccessor httpContextAccessor)
        {
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<TeamResult>> Handle(UpdateTeamRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (_teamRepository.GetTeamByTeamId(request.teamId) is not Team team)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }
            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, team.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }

            team.Name = request.Name;
            team.Industry = request.Industry;
            team.Country = request.Country;
            team.Email = request.Email;
            team.City = request.City;
            team.Address = request.Address;
            team.PhoneNumber = request.PhoneNumber;
            team.Url = request.Url;
            team.ZipCode = request.ZipCode;
            team.UpdatedAt = DateTime.UtcNow;

            _teamRepository.UpdateTeam(team);

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
