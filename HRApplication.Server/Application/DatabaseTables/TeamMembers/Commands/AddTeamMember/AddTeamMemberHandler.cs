using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

// TODO : check if user is already created
namespace HRApplication.Server.Application.DatabaseTables.TeamMembers.Commands.AddTeamMember
{
    public class AddTeamMemberHandler : IRequestHandler<AddTeamMemberRequest, ErrorOr<Unit>>
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AddTeamMemberHandler(ITeamMemberRepository teamMemberRepository, ITeamRepository teamRepository, IHttpContextAccessor httpContextAccessor)
        {
            _teamMemberRepository = teamMemberRepository;
            _teamRepository = teamRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ErrorOr<Unit>> Handle(AddTeamMemberRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, request.teamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            if (request.roleName != "Employee")
            {
                return CustomErrorOr.CustomErrors.Role.NoRoleExists;
            }
            var newTeamMember = new TeamMember(request.userId, request.teamId, request.jobPositionId, request.roleName);

            if (_teamMemberRepository.GetTeamMemberFromCollection(newTeamMember) is TeamMember)
            {
                return CustomErrorOr.CustomErrors.Team.TeamMemeberAlreadyInCollection;
            }

            _teamMemberRepository.AddNewTeamMemberToCollection(newTeamMember);

            return Unit.Value;
        }
    }

}
