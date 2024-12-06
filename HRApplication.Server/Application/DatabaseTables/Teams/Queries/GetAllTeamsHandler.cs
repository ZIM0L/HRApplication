using ErrorOr;
using HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands;
using HRApplication.Server.Application.DatabaseTables.Teams.Queries;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace HRApplication.Server.Application.DatabaseTables.Teams.Commands
{
    public class GetAllTeamsHandler : IRequestHandler<GetAllTeamsRequest, ErrorOr<List<TeamResult>>>
    {
        private readonly ITeamRepository _teamRepository;
        public GetAllTeamsHandler(ITeamRepository teamRepository, IMediator mediator)
        {
            _teamRepository = teamRepository;
        }

        public async Task<ErrorOr<List<TeamResult>>> Handle(GetAllTeamsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var teams = _teamRepository.GetTeams();

            if (teams.IsNullOrEmpty())
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }

            return teams.Select(team => new TeamResult(
                team.Name,
                team.Industry,
                team.Country,
                team.Url,
                team.Email,
                team.Address,
                team.City,
                team.PhoneNumber,
                team.ZipCode
                )).ToList();
            
        }
    }
}
