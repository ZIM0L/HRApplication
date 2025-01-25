using Microsoft.AspNetCore.Mvc;

namespace HRApplication.Server.Application.ImgUpload.TeamImage.Queries.GetTeamsImages
{
    public record TeamsImagesResult(Dictionary<string, string> TeamImage);

}
