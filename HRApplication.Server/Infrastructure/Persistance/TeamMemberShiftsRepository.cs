using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamMemberShiftsRepository : ITeamMemberShiftsRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamMemberShiftsRepository(DBDatabase dbContex) 
        {
            _dbContex = dbContex;
        }

        public void AddTeamMemberShifts(List<TeamMemberShift> teamMemberShift)
        {
            _dbContex.Team_Member_Shifts.AddRange(teamMemberShift);
            _dbContex.SaveChanges();
        }

        public List<TeamMemberShift>? GetTeamMemberShiftsByUserIdAndDates(Guid userId, List<DateTime> dates)
        {
            return _dbContex.Team_Member_Shifts
                  .Where(shift => shift.UserId == userId && dates.Contains(shift.ShiftDate))
                  .ToList();
        }

        public List<TeamMemberShift>? GetTeamMemberShiftsByUsersId(List<Guid> UsersIds)
        {
            return _dbContex.Team_Member_Shifts
                .Where(x => UsersIds.Contains(x.UserId))
                .ToList();
        }

        public void RemoveTeamMemberShifts(List<TeamMemberShift> shifts)
        {
            _dbContex.Team_Member_Shifts.RemoveRange(shifts);
            _dbContex.SaveChanges();
        }
    }
}
