using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Infrastructure.Persistance;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.JobPositions.Commands.DeleteJobPosition
{
    public class DeleteJobPositionHandler : IRequestHandler<DeleteJobPositionRequest, ErrorOr<Unit>>
    {
        private readonly IJobPositionsRepository _jobPositionsRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IInvitationRepository _invitationRepository;
        public DeleteJobPositionHandler(IHttpContextAccessor httpContextAccessor, IJobPositionsRepository jobPositionsRepository, ITeamMemberRepository teamMemberRepository, IInvitationRepository invitationRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _jobPositionsRepository = jobPositionsRepository;
            _teamMemberRepository = teamMemberRepository;
            _invitationRepository = invitationRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(DeleteJobPositionRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var httpContext = _httpContextAccessor.HttpContext;
            var jobPostionId = Guid.Parse(request.jobPositionId);
            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if(_jobPositionsRepository.GetJobPositionById(jobPostionId) is not Domain.Models.JobPosition jobPosition)
            {
                return CustomErrorOr.CustomErrors.JobPosition.NoJobPositionExists;
            }
            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, jobPosition.TeamId, BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            var updatedTeam = _teamMemberRepository.GetTeamMembersByjobPositionIdFromCollection(jobPosition.JobPositionId)?.Select(member =>
            {
                member.JobPositionId = null;
                return member;
            }).ToList();

            if(updatedTeam != null){

                _teamMemberRepository.UpdateTeamMembersFromCollection(updatedTeam);
            }

            var invitationToDelete = _invitationRepository.GetInvitatiosnByJobPositionId(jobPosition.JobPositionId);

            if(invitationToDelete != null)
            {
                _invitationRepository.DeleteInvitations(invitationToDelete);
            }

            _jobPositionsRepository.DeleteJobPosition(jobPosition);

            return Unit.Value;
        }
    }
}
