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
        //public DbSet<EmployeeJobPosition> EmployeeJobPositions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }


}
