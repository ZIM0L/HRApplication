using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Authentication
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DataController : ErrorController
    {
        [HttpGet]
        public IActionResult GetData()
        {
            // Your protected data retrieval logic here
            return Ok(new { message = "Protected data retrieved successfully!" });
        }
    }
}
