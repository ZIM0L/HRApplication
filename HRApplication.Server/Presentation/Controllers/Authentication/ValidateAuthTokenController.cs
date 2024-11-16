using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ErrorOr;
using HRApplication.Server.Application.CustomErrorOr;
using ReactApp1.Server.Presentation.Api.Controllers;
using MediatR;
using HRApplication.Server.Application.Authentication.Queries.ValidateUser;


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
        private readonly IMediator _mediator;

        public ValidateAuthTokenController(IConfiguration configuration, IMediator mediator)
        {
            _secretKey = configuration["JwtSettings:SecretKey"];
            _issuer = configuration["JwtSettings:Issuer"];
            _audience = configuration["JwtSettings:Audience"];
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult >ValidateToken()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return Problem(new List<Error> { CustomErrors.Token.InvalidFormatError});
            }
            //actual token
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            var tokenPayload = handler.ReadJwtToken(token).Payload;
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

                var result = await _mediator.Send(new ValidateUserRequest(
                    new Guid(tokenPayload.Sub),
                    tokenPayload["given_name"].ToString(),
                    tokenPayload["family_name"].ToString(),
                    tokenPayload["email"].ToString(),
                    tokenPayload["role"].ToString(),
                    tokenPayload["phonenumber"].ToString()));

                if (result.IsError) {
                    return Problem(result.Errors);
                }

                return Ok(new { message = tokenPayload });
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
