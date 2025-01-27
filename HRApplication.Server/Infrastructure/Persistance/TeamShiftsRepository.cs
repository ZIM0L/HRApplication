using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Infrastructure.DBContex;

namespace HRApplication.Server.Infrastructure.Persistance
{
    public class TeamShiftsRepository : ITeamShiftsRepository
    {
        private readonly DBDatabase _dbContex;
        public TeamShiftsRepository(DBDatabase dbContex)
        {
            _dbContex = dbContex;
        }

        public void AddNewTeamShift(TeamShift teamShift)
        {
            _dbContex.Team_Shifts.Add(teamShift);
            _dbContex.SaveChanges();
        }

        public void DeleteTeamShift(TeamShift teamShift)
        {
            _dbContex.Team_Shifts.Remove(teamShift);
            _dbContex.SaveChanges();
        }

        public TeamShift? GetTeamShiftById(Guid teamShiftId)
        {
            return _dbContex.Team_Shifts.SingleOrDefault(x => x.TeamShiftId == teamShiftId);
        }

        public TeamShift? GetTeamShiftByTeamShiftId(Guid teamShiftId)
        {
            return _dbContex.Team_Shifts.SingleOrDefault(x => x.TeamShiftId == teamShiftId);
        }

        public List<TeamShift>? GetTeamShiftsByTeamId(Guid teamId)
        {
            return _dbContex.Team_Shifts.Where(x => x.TeamId.Equals(teamId)).ToList();
        }
    }
}
