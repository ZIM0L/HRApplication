using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands
{
    public class AddTeamMemberHandler : IRequestHandler<AddTeamMemberRequest, ErrorOr<Unit>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;

        public AddTeamMemberHandler(ITeamMemberRepository teamMemberRepository, ITeamRepository teamRepository)
        {
            _teamMemberRepository = teamMemberRepository;
            _teamRepository = teamRepository;
        }

        public async Task<ErrorOr<Unit>> Handle(AddTeamMemberRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;


            if (_teamRepository.GetTeamById(request.teamId) is not Team)
            {
                return CustomErrorOr.CustomErrors.Team.TeamNotFound;
            }
            if (_teamMemberRepository.GetTeamMemberByUserIdFromCollection(request.userId) is TeamMember)
            {
                return CustomErrorOr.CustomErrors.Team.UserAlreadyCreatedTeam;
            }
            var newTeamMember = new TeamMember(request.userId, request.teamId);

            //do same as for team (generate new guid)
            if (_teamMemberRepository.GetTeamMemberFromCollection(newTeamMember) is TeamMember)
            {
                return CustomErrorOr.CustomErrors.Team.TeamAlreadyExists;
            }

            _teamMemberRepository.AddNewTeamMemberToCollection(newTeamMember);

            return Unit.Value;
        }
    }

}
