using HRApplication.Server.Application.JwtSettings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReactApp1.Server.Application.Interfaces.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ReactApp1.Server.Infrastructure.Authentication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly IOptions<JwtSetting> _jwtSetting;
        public JwtTokenGenerator(IOptions<JwtSetting> jwtSetting, IHttpContextAccessor httpContextAccessor)
        {
            _jwtSetting = jwtSetting;
        }

        public string GenerateToken(User user)
        {

            //maybe change
            var secretKey = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("JwtSettings")["SecretKey"];
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                    SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString() ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.GivenName, user.Name ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.Surname ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("phonenumber", user.PhoneNumber ?? string.Empty)
            };

            var securityToken = new JwtSecurityToken(
                issuer: "your-issuer",
                audience: "your-audience",
                expires: DateTime.UtcNow.AddMinutes(60),
                claims: claims,
                signingCredentials: signingCredentials
                );
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public string GenerateRefreshToken(string token)
        {
            var randomNumber = new byte[32]; // Użyj 64 bajtów dla lepszego bezpieczeństwa
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }
            var refreshToken = Convert.ToBase64String(randomNumber);
            return refreshToken;
        }

    }
}
