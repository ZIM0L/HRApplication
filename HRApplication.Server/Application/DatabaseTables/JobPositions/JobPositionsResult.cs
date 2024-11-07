namespace HRApplication.Server.Application.DatabaseTables.JobPositions
{
    public record JobPositionsResult(
        string Title,
        string Description,
        Boolean IsActive,
        DateTime CreatedDate,
        DateTime? UpdatedDate
    );
}
