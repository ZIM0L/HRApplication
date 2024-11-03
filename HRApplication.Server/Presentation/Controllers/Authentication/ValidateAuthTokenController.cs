using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ErrorOr;
using HRApplication.Server.Application.CustomErrorOr;
using ReactApp1.Server.Presentation.Api.Controllers;


namespace HRApplication.Server.Presentation.Controllers.Authentication
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ValidateAuthTokenController : ErrorController
    {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;

        public ValidateAuthTokenController(IConfiguration configuration)
        {
            _secretKey = configuration["JwtSettings:SecretKey"];
            _issuer = configuration["JwtSettings:Issuer"];
            _audience = configuration["JwtSettings:Audience"];
        }
        [HttpGet]
        public IActionResult ValidateToken()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return Problem(new List<Error> { CustomErrors.Token.InvalidFormatError});
            }
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            try
            {
                // Validate the token
                var principal = handler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
                    ValidateIssuer = true,
                    ValidIssuer = _issuer,
                    ValidateAudience = true,
                    ValidAudience = _audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero 
                }, out SecurityToken validatedToken);

                
                return Ok(new { message = "Token is valid." });
            }
            catch (SecurityTokenExpiredException)
            {
                return Problem(new List<Error> { CustomErrors.Token.ExpiredError }); 
            }
            catch (SecurityTokenInvalidSignatureException)
            {
                return Problem(new List<Error> { CustomErrors.Token.InvalidSignatureError }); 
            }
            catch (Exception ex)
            {
                return Problem(new List<Error> { Error.Unexpected("Token", $"Token is invalid: {ex.Message}") }); 
            }
        }
    }
}
