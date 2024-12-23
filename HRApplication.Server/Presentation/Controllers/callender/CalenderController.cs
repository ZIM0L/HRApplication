using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using HRApplication.Server.Application.Interfaces.Repositories;
using System.Security.Claims;
using ReactApp1.Server.Presentation.Api.Controllers;

namespace HRApplication.Server.Presentation.Controllers
{
    [Route("/calendar")]
    [Authorize] // Tylko zalogowani użytkownicy mogą uzyskać dostęp

    public class CalendarController : ErrorController
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly CalendarService _calendarService;

        //public CalendarController(IHttpContextAccessor httpContextAccessor)
        //{
        //    _httpContextAccessor = httpContextAccessor;

        //    // Pobierz RefreshToken użytkownika z bazy danych
        //    var userRefreshToken = GetUserRefreshToken();

        //    if (string.IsNullOrEmpty(userRefreshToken))
        //    {
        //        throw new UnauthorizedAccessException("User is not authenticated.");
        //    }

        //    // Wygeneruj AccessToken na podstawie RefreshToken
        //    var credential = GoogleCredential.FromRefreshToken(userRefreshToken)
        //        .CreateScoped(CalendarService.Scope.Calendar);

        //    _calendarService = new CalendarService(new Google.Apis.Services.BaseClientService.Initializer
        //    {
        //        HttpClientInitializer = credential,
        //        ApplicationName = "Open4Hire" // Może być dowolna nazwa aplikacji
        //    });
        //}


        // Wyświetlanie wydarzeń w kalendarzu
        [HttpGet]
        [Route("events")]
        public async Task<IActionResult> GetEvents()
        {
            try
            {
                var eventsRequest = _calendarService.Events.List("primary"); // primary - domyślny kalendarz
                eventsRequest.MaxResults = 10; // Liczba wyświetlanych wydarzeń
                eventsRequest.OrderBy = EventsResource.ListRequest.OrderByEnum.StartTime;
                eventsRequest.TimeMin = DateTime.UtcNow; // Tylko przyszłe wydarzenia

                var events = await eventsRequest.ExecuteAsync();

                // Przekształcenie wyników na bardziej przyjazny format
                var eventList = events.Items.Select(e => new
                {
                    e.Summary,
                    e.Start,
                    e.End,
                    e.Id
                }).ToList();

                return Ok(eventList);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error fetching calendar events: {ex.Message}");
            }
        }

        // Tworzenie nowego wydarzenia
        [HttpPost]
        [Route("create-event")]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
        {
            try
            {
                var newEvent = new Event
                {
                    Summary = request.Summary,
                    Location = request.Location,
                    Description = request.Description,
                    Start = new EventDateTime
                    {
                        DateTime = request.Start,
                        TimeZone = "UTC"
                    },
                    End = new EventDateTime
                    {
                        DateTime = request.End,
                        TimeZone = "UTC"
                    },
                    Attendees = request.Attendees?.Select(a => new EventAttendee { Email = a }).ToList()
                };

                var createRequest = _calendarService.Events.Insert(newEvent, "primary");
                var createdEvent = await createRequest.ExecuteAsync();

                return Ok(new { EventId = createdEvent.Id, Message = "Event created successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating event: {ex.Message}");
            }
        }

        // Usuwanie wydarzenia
        [HttpDelete]
        [Route("delete-event/{eventId}")]
        public async Task<IActionResult> DeleteEvent(string eventId)
        {
            try
            {
                var deleteRequest = _calendarService.Events.Delete("primary", eventId);
                await deleteRequest.ExecuteAsync();

                return Ok(new { Message = "Event deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting event: {ex.Message}");
            }
        }
    }

    // Model dla tworzenia wydarzenia
    public class CreateEventRequest
    {
        public string Summary { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public List<string> Attendees { get; set; } = [""]; // Lista emaili uczestników
    }
}
