namespace HRApplication.Server.Application.DatabaseTables.JobPositions
{
    public record JobPositionsResult(
        Guid JobPositionId,
        string Title,
        string Description,
        Boolean IsActive,
        Boolean IsRecruiting,
        DateTime CreatedDate,
        DateTime? UpdatedDate
    );
}
