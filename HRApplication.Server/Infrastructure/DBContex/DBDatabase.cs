using HRApplication.Server.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace HRApplication.Server.Infrastructure.DBContex
{
    public class DBDatabase : DbContext
    {
        public DBDatabase(DbContextOptions<DBDatabase> options) : base(options) { } //trzeba dodac

        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }


}
