using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.CalendarEvents
{
    public class CreateCalendarEventsHandler : IRequestHandler<CreateCalendarEventsRequest, ErrorOr<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICalendarEventsRepository _calendarEventsRepository;
        private readonly ITeamsCalendarRepository _teamsCalendarRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        public CreateCalendarEventsHandler(IHttpContextAccessor httpContextAccessor, ICalendarEventsRepository calendarEventsRepository, ITeamsCalendarRepository teamsCalendarRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _calendarEventsRepository = calendarEventsRepository;
            _teamsCalendarRepository = teamsCalendarRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(CreateCalendarEventsRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext); 

            return Unit.Value;
        }
    }
}
