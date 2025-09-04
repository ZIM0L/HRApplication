using HRApplication.Server.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace HRApplication.Server.Infrastructure.DBContex
{
    public class DBDatabase : DbContext
    {
        public DBDatabase(DbContextOptions<DBDatabase> options) : base(options) { } //trzeba dodac

        public DbSet<User> Users { get; set; }
        public DbSet<JobPosition> Job_Positions { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> Team_Members { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<TeamsCalendar> Teams_Calendar { get; set; }
        public DbSet<CalendarEvent> Calendar_Events { get; set; }
        public DbSet<TeamShift> Team_Shifts { get; set; }
        public DbSet<TeamMemberShift> Team_Member_Shifts { get; set; }
        public DbSet<TeamMemberRequest> Team_Members_Requests { get; set; }
        public DbSet<TeamQuestion> Team_Questions { get; set; }
        public DbSet<SubQuestion> Sub_Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<TeamMember>()
             .HasOne(user => user.User)
             .WithMany(teamMember => teamMember.TeamMembers)
             .HasForeignKey(user => user.UserId);

            modelBuilder.Entity<TeamMember>()
                .HasOne(team => team.Team)
                .WithMany(teamMember => teamMember.TeamMembers)
                .HasForeignKey(team => team.TeamId);

            modelBuilder.Entity<TeamMemberShift>()
                .HasOne(user => user.User)
                .WithMany(teamMemberShift => teamMemberShift.TeamMemberShifts)
                .HasForeignKey(user => user.UserId);

            modelBuilder.Entity<TeamMemberShift>()
                .HasOne(teamShift => teamShift.TeamShift)
                .WithMany(teamMemberShift => teamMemberShift.TeamMemberShifts)
                .HasForeignKey(teamShift => teamShift.TeamShiftId);

            modelBuilder.Entity<JobPosition>()
                .HasOne(team => team.Team)
                .WithMany(jobPosition => jobPosition.JobPositions)
                .HasForeignKey(team => team.TeamId);

            modelBuilder.Entity<TeamMember>()
                .HasOne(jobPosition => jobPosition.JobPosition)
                .WithMany(teamMember => teamMember.TeamMembers)
                .HasForeignKey(jobPosition => jobPosition.JobPositionId);

            modelBuilder.Entity<Invitation>()
                .HasOne(user => user.User)
                .WithMany(invitation => invitation.Invitations)
                .HasForeignKey(user => user.UserId);

            modelBuilder.Entity<Invitation>()
                .HasOne(jobPosition => jobPosition.JobPosition)
                .WithMany(invitation => invitation.Invitations)
                .HasForeignKey(jobPosition => jobPosition.JobPositionId);

            modelBuilder.Entity<TeamShift>()
                .HasOne(team => team.Team)
                .WithMany(teamShift => teamShift.TeamShifts)
                .HasForeignKey(team => team.TeamId);

            modelBuilder.Entity<TeamQuestion>()
                .HasOne(team => team.Team)
                .WithMany(teamQuestion => teamQuestion.TeamQuestions)
                .HasForeignKey(team => team.TeamId);

            modelBuilder.Entity<SubQuestion>()
                .HasOne(teamQuestion => teamQuestion.TeamQuestion)
                .WithMany(subQuestion => subQuestion.SubQuestions)
                .HasForeignKey(teamQuestion => teamQuestion.TeamQuestionId);

            modelBuilder.Entity<TeamMemberRequest>()
                .HasOne(user => user.User)
                .WithMany(teamMemberRequest => teamMemberRequest.TeamMemberRequests)
                .HasForeignKey(user => user.UserId);

            modelBuilder.Entity<TeamMemberRequest>()
                .HasOne(team => team.Team)
                .WithMany(teamMemberRequest => teamMemberRequest.TeamMembersRequests)
                .HasForeignKey(team => team.TeamId);

            modelBuilder.Entity<TeamsCalendar>()
                .HasOne(team => team.Team)
                .WithMany(teamsCalendar => teamsCalendar.TeamsCalendars)
                .HasForeignKey(team => team.TeamId);

            modelBuilder.Entity<CalendarEvent>()
                .HasOne(teamsCalendar => teamsCalendar.TeamsCalendar)
                .WithMany(calendarEvent => calendarEvent.CalendarEvents)
                .HasForeignKey(teamsCalendar => teamsCalendar.TeamsCalendarId);



            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }


}
