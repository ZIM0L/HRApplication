using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamImage
{
    public class GetTeamImageHandler : IRequestHandler<GetTeamImageRequest, ErrorOr<FileResult>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        public GetTeamImageHandler(IHttpContextAccessor httpContextAccessor, ITeamMemberRepository teamMemberRepository, ITeamRepository teamRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRepository = teamRepository;
        }
        public async Task<ErrorOr<FileResult>> Handle(GetTeamImageRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }
            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var userTeamMembers = _teamMemberRepository.GetTeamMembersByTeamIdAndUserId(Guid.Parse(request.teamId), Guid.Parse(BearerCheckerResult.Value.Payload.Sub));

            if (userTeamMembers == null)
            {
                return CustomErrorOr.CustomErrors.Team.UserDoesntBelongToTeam;
            }

            if (_teamRepository.GetTeamByTeamId(Guid.Parse(request.teamId)) is not Team team)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }

            var fileName = team.TeamProfilePathImage;
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", team.TeamId.ToString());

            var filePath = string.IsNullOrEmpty(fileName)
                            ? Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", "Default", "default-teamprofile-photo.jpg")
                            : Path.Combine(uploadsFolder, fileName);

            if (!File.Exists(filePath))
            {
                filePath = Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", "Default", "default-teamprofile-photo.jpg");
            }

            byte[] fileBytes = File.ReadAllBytes(filePath);

            return new FileContentResult(fileBytes, "application/octet-stream")
            {
                FileDownloadName = fileName ?? "default-teamprofile-photo.jpg"
            };
        }                             
    }
}
