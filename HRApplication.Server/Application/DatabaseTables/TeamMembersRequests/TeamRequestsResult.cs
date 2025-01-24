namespace HRApplication.Server.Application.DatabaseTables.TeamMembersRequests
{
    public record TeamRequestsResult(Guid teamMemberRequestId, string title, string requestContent, string status, string name, string surname, string email, DateTime submittedAt, DateTime? alteredAt  );
}
