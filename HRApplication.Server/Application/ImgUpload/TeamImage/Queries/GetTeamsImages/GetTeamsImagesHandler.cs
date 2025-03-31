using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamsImages
{
    public class GetTeamsImagesHandler : IRequestHandler<GetTeamsImagesRequest, ErrorOr<TeamsImagesResult?>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly ITeamRepository _teamRepository;

        public GetTeamsImagesHandler(
            IHttpContextAccessor httpContextAccessor,
            ITeamMemberRepository teamMemberRepository,
            ITeamRepository teamRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _teamMemberRepository = teamMemberRepository;
            _teamRepository = teamRepository;
        }

        public async Task<ErrorOr<TeamsImagesResult?>> Handle(GetTeamsImagesRequest request, CancellationToken cancellationToken)
        {
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var bearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);
            var userId = Guid.Parse(bearerCheckerResult.Value.Payload.Sub);

            var usersTeams = _teamMemberRepository.GetTeamMembersByUserIdFromCollection(userId);

            if (usersTeams == null || !usersTeams.Any())
            {
                var base64Image = await GetDefaultTeamImageBase64Async();
                var defaultTeamImages = new Dictionary<string, string>
                {
                    { "default", base64Image }
                };
                return new TeamsImagesResult(defaultTeamImages);
            }

            var teamIds = usersTeams.Select(x => x.TeamId).ToList();
            var teams = _teamRepository.GetTeamsByTeamIds(teamIds);

            if (teams == null || !teams.Any())
            {
                var base64Image = await GetDefaultTeamImageBase64Async();
                var defaultTeamImages = new Dictionary<string, string>
                {
                    { "default", base64Image }
                };
                return new TeamsImagesResult(defaultTeamImages);
            }

            var teamImages = new Dictionary<string, string>();

            foreach (var team in teams)
            {
                var base64Image = await GetTeamImageBase64Async(team);
                teamImages[team.TeamId.ToString()] = base64Image;
            }

            return new TeamsImagesResult(teamImages);
        }

        private async Task<string> GetTeamImageBase64Async(Domain.Models.Team team)
        {
            var fileName = team.TeamProfilePathImage;
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", team.TeamId.ToString());

            var filePath = string.IsNullOrEmpty(fileName)
                ? Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", "Default", "default-teamprofile-photo.jpg")
                : Path.Combine(uploadsFolder, fileName);

            if (!File.Exists(filePath))
            {
                filePath = Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", "Default", "default-teamprofile-photo.jpg");
            }

            byte[] fileBytes = await File.ReadAllBytesAsync(filePath);

            string base64Image = Convert.ToBase64String(fileBytes);

            return base64Image;
        }  
        private async Task<string> GetDefaultTeamImageBase64Async()
        {

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "TeamsPictures", "Default", "default-teamprofile-photo.jpg");
               
            if (!File.Exists(filePath))
            {
              Console.WriteLine("File not found: " + filePath);
            }

            byte[] fileBytes = await File.ReadAllBytesAsync(filePath);

            string base64Image = Convert.ToBase64String(fileBytes);

            return base64Image;
        }
    }
}
