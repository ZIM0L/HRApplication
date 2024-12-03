namespace HRApplication.Server.Application.DatabaseTables.JobPositions
{
    public record JobPositionsResult(
        string Title,
        string Description,
        Boolean IsActive,
        Boolean IsRecruiting,
        DateTime CreatedDate,
        DateTime? UpdatedDate
    );
}
