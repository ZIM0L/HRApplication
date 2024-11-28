using System.IdentityModel.Tokens.Jwt;
using ErrorOr;
using Microsoft.AspNetCore.Mvc;

namespace HRApplication.Server.Application.Utilities
{
    public static class BearerChecker
    {
        public static ErrorOr<(JwtPayload Payload, string Token, JwtSecurityTokenHandler Handler)> CheckBearerToken(HttpContext context)
        {
            var authorizationHeader = context.Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();
            var tokenPayload = handler.ReadJwtToken(token).Payload;

            return (tokenPayload, token, handler);
        }
    }
}
