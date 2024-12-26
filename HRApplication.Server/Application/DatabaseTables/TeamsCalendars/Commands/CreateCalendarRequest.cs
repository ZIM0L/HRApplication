using ErrorOr;
using HRApplication.Server.Domain.Models;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands
{
    public record CreateCalendarRequest(Guid teamId) : IRequest<ErrorOr<Unit>>;
}
