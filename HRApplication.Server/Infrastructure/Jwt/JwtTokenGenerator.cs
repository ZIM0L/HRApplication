using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ReactApp1.Server.Application.Interfaces.Authentication;
using HRApplication.Server.Domain.Models;
using HRApplication.Server.Application.JwtSettings;
using Microsoft.Extensions.Options;

namespace ReactApp1.Server.Infrastructure.Authentication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly IOptions<JwtSetting> _jwtSetting;
        public JwtTokenGenerator(IOptions<JwtSetting> jwtSetting)
        {
            _jwtSetting = jwtSetting;
        }

        public string GenerateToken(User user)
        {
            var secretKey = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("JwtSettings")["SecretKey"];
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                    SecurityAlgorithms.HmacSha256);
            
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString() ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.GivenName, user.Name ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.Surname ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var securityToken = new JwtSecurityToken(
                issuer: "Adrian",
                expires: new DateTime().AddMinutes(60),   
                claims: claims,
                signingCredentials: signingCredentials
                );
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}
