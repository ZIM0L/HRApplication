using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers.Schedule
{
    [Route("schedule")]
    [ApiController]
    public class ScheduleController : ErrorController
    {

        [HttpPost]
        //[Authorize]
        [Route("/schedule/addSchedule")]
        public IActionResult AddToSchedule()
        {

            return Ok("everytinh ok");
        }
    }
}
