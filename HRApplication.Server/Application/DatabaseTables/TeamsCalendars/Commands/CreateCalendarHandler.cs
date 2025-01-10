using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands
{
    public class CreateCalendarHandler : IRequestHandler<CreateCalendarRequest, ErrorOr<Unit>>
    {
        private readonly ITeamsCalendarRepository _teamsCalendarRepository;
        public CreateCalendarHandler(ITeamsCalendarRepository teamsCalendarRepository)
        {
            _teamsCalendarRepository = teamsCalendarRepository;
        }
        public async Task<ErrorOr<Unit>> Handle(CreateCalendarRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var teamCalender = new TeamsCalendar(request.teamId);

            _teamsCalendarRepository.CreateTeamCalendar(teamCalender);

            return Unit.Value;
        }
    }
}
