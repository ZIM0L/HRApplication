namespace HRApplication.Server.Domain.Enum
{
    public static class EventType
    {
        public static readonly Dictionary<string, string> EventTypeDescriptions = new()
            {
                { "WorkRelated", "Events related to work, meetings, training, deadlines, and performance reviews." },
                { "Personal", "Events related to personal matters such as holidays, leave, and personal celebrations." },
                { "Team", "Team building, company events, and recruitment." },
                { "HealthAndWellness", "Health checks, certifications, and wellbeing events." },
                { "Meetings", "All types of internal and external meetings." },
                { "Celebrations", "Personal or company-wide celebrations like birthdays, anniversaries, and holidays." },
                { "Financial", "Payroll, financial planning, and budgeting events." },
                { "Administrative", "Administrative tasks like HR meetings, system updates, and maintenance." },
                { "Projects", "Project-related events, timelines, milestones, and deadlines." }
            };
    }

}
