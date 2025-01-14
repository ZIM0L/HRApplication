using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamShiftsRepository
    {
        void AddNewTeamShift(TeamShift teamShift);
        List<TeamShift>? GetTeamShifts(Guid teamId);
        TeamShift? GetTeamShiftByTeamShiftId(Guid teamShiftId);
        void DeleteTeamShift(TeamShift teamShift);
    }
}
