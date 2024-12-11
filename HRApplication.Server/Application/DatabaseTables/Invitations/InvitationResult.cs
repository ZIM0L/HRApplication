namespace HRApplication.Server.Application.DatabaseTables
{
    public class InvitationResult
    {
        public InvitationResult(Guid invitationId, string fromUserName, string fromUserSurname, Guid jobPositionId, string jobPositionTitle, string teamName, string teamIndustry, DateTime submittedAt)
        {
            InvitationId = invitationId;
            FromUserName = fromUserName;
            FromUserSurname = fromUserSurname;
            JobPositionId = jobPositionId;
            JobPositionTitle = jobPositionTitle;
            TeamName = teamName;
            TeamIndustry = teamIndustry;
            SubmittedAt = submittedAt;
        }
        public Guid InvitationId { get; set; }
        public Guid JobPositionId  {  get; set; }
        public string FromUserName {  get; set; }
        public string FromUserSurname {  get; set; }
        public string JobPositionTitle  {  get; set; }
        public string TeamName  {  get; set; }
        public string TeamIndustry  {  get; set; }
        public DateTime SubmittedAt {  get; set; }       
    }
}
