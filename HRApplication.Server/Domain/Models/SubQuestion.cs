namespace HRApplication.Server.Domain.Models
{
    public class SubQuestion
    {
        public SubQuestion(Guid teamQuestionId, string subTitle, string subDescription)
        {
            SubQuestionId = Guid.NewGuid();
            TeamQuestionId = teamQuestionId;
            SubTitle = subTitle;
            SubDescription = subDescription;
        }
        public Guid SubQuestionId { get; set; }
        public string SubTitle { get; set; }
        public string SubDescription { get; set; }
        public Guid TeamQuestionId { get; set; }
    }
}
