using HRApplication.Server.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace HRApplication.Server.Infrastructure.DBContex
{
    public class DBDatabase : DbContext
    {
        public DBDatabase(DbContextOptions<DBDatabase> options) : base(options) { } //trzeba dodac

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<JobPosition> Job_Positions { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> Team_Members { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<TeamsCalendar> Teams_Calendar { get; set; }
        public DbSet<CalendarEvent> Calendar_Events { get; set; }
        public DbSet<TeamShift> Team_Shifts { get; set; }
        public DbSet<TeamMemberShift> Team_Member_Shifts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }


}
