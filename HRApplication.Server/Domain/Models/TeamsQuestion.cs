namespace HRApplication.Server.Domain.Models
{
    public class TeamsQuestion
    {
        public TeamsQuestion(Guid teamid){
            TeamQuestionId = Guid.NewGuid();
            TeamId = teamid;
        }
        public Guid TeamQuestionId { get; set; }
        public Guid TeamId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;


    }
}
