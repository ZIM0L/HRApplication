namespace HRApplication.Server.Application.DatabaseTables.TeamQuestions
{
    public record TeamQuestionResult(string teamQuestionId, string title, string description, List<KeyValuePair<string, string>>? subQuestions = null);
}
