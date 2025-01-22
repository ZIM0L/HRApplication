using ErrorOr;
using HRApplication.Server.Application.ImgUpload.TeamImage.Commands.TeamUserImage;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Commands.UploadTeamImage
{
    public class UploadTeamImageHandler : IRequestHandler<UploadTeamImageRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;
        public UploadTeamImageHandler(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, ITeamMemberRepository teamMemberRepository, ITeamRepository teamRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _teamMemberRepository = teamMemberRepository;
            _teamRepository = teamRepository;
        }

        public async Task<ErrorOr<Unit>> Handle(UploadTeamImageRequest request, CancellationToken cancellationToken)
        {
            if (request.image == null || request.image.Length == 0)
            {
                return CustomErrorOr.CustomErrors.Images.NoFileSend;
            }

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            var isAdminResult = IsAdministrator.CheckUser(_teamMemberRepository, Guid.Parse(request.teamId), BearerCheckerResult.Value.Payload.Sub);
            if (isAdminResult.IsError)
            {
                return isAdminResult.Errors;
            }
            if(_teamRepository.GetTeamByTeamId(Guid.Parse(request.teamId)) is not Team team)
            {
                return CustomErrorOr.CustomErrors.Team.NoTeamFound;
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", team.TeamId.ToString());
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var existingFiles = Directory.GetFiles(uploadsFolder);
            foreach (var file in existingFiles)
            {
                File.Delete(file);
            }

            var fileName = request.image.FileName;
            var absoluteFilePath = Path.Combine(uploadsFolder, fileName);

            using (var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
            {
                await request.image.CopyToAsync(fileStream);
            }

            team.TeamProfilePathImage = fileName;
            _teamRepository.UpdateTeam(team);

            return Unit.Value;
        }
    }
}
