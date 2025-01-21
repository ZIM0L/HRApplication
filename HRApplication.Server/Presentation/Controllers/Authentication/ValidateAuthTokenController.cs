using ErrorOr;
using HRApplication.Server.Application.Authentication.Queries.ValidateUser;
using HRApplication.Server.Application.CustomErrorOr;
using HRApplication.Server.Application.Utilities;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReactApp1.Server.Presentation.Api.Controllers;
using System.Text;


namespace HRApplication.Server.Presentation.Controllers.Authentication
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ValidateAuthTokenController : ErrorController
    {

        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly IMediator _mediator;

        public ValidateAuthTokenController(IConfiguration configuration, IMediator mediator)
        {
            _secretKey = configuration["JwtSettings:SecretKey"]!;
            _issuer = configuration["JwtSettings:Issuer"]!;
            _audience = configuration["JwtSettings:Audience"]!;
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> ValidateToken()
        {
            var BearerCheckerResult = BearerChecker.CheckBearerToken(HttpContext);
           
            try
            {
                // Validate the token
                var principal = BearerCheckerResult.Value.Handler.ValidateToken(BearerCheckerResult.Value.Token, new TokenValidationParameters
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
                    new Guid(BearerCheckerResult.Value.Payload.Sub),
                    BearerCheckerResult.Value.Payload["given_name"].ToString()!,
                    BearerCheckerResult.Value.Payload["family_name"].ToString()!,
                    BearerCheckerResult.Value.Payload["email"].ToString()!,
                    BearerCheckerResult.Value.Payload["phonenumber"].ToString()!));

                if (result.IsError)
                {
                    return Problem(result.Errors);
                }

                return Ok(new { message = BearerCheckerResult.Value.Payload });
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
