using HRApplication.Server.Domain.Models;

namespace HRApplication.Server.Application.Interfaces.Repositories
{
    public interface ITeamMemberShiftsRepository
    {
        List<TeamMemberShift>? GetTeamMemberShiftsByUserIdAndDates(Guid userId, List<DateTime> dates);
        List<TeamMemberShift>? GetTeamMemberShiftsByUsersId(List<Guid> UsersIds);
        List<TeamMemberShift>? GetTeamMemberShiftsByTeamShiftId(Guid teamShiftId);
        TeamMemberShift? GetTeamMemberShiftsByUserIdAndShiftDate(Guid userId, DateTime shiftDate);
        TeamMemberShift? GetTeamMemberShiftByTeamMemberShiftId(Guid? teamMemberShiftId);
        void RemoveTeamMemberShifts(List<TeamMemberShift> shifts);
        void AddTeamMemberShifts(List<TeamMemberShift> teamMemberShift);
        void DeleteTeamMemberShfits(List<TeamMemberShift> teamMemberShifts);
        List<TeamMemberShift>? GetTeamMemberShiftsByTeamShiftsIds(List<Guid> teamShiftsIds);
    }
}
