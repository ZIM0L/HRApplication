namespace HRApplication.Server.Application.Utilities
{
    public static class GuidValidator
    {
        public static bool IsValidGuid(string guidString)
        {
            return Guid.TryParse(guidString, out _);
        }
        public static bool IsValidGuid(Guid guid)
        {
            return guid != Guid.Empty;
        }
    }
}
