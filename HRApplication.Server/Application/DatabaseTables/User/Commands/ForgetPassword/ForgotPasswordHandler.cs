using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using MediatR;
using MimeKit;
using MailKit.Net.Smtp;
using System.Security.Cryptography;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ForgetPassword
{
    public class ForgotPasswordHandler : IRequestHandler<ForgetPasswordRequest, ErrorOr<bool>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ForgotPasswordHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<bool>> Handle(ForgetPasswordRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            var httpContext = _httpContextAccessor.HttpContext;

            if (_userRepository.GetUserByEmail(request.email) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.UserNotFound;
            }
            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
            user.ResetToken = token;
            user.ResetTokenExpiry = DateTime.UtcNow.AddMinutes(10);

            _userRepository.UpdateUser(user);

            // STATIC PORT 
            var port = 5173;
            var resetLink = $"https://localhost:{port}/resetpassword?token={Uri.EscapeDataString(token)}";
            var body = $"Password reset link: {resetLink}";

            var email = new MimeMessage();


            email.From.Add(new MailboxAddress("Open4Hire", "Open4Hire@email.com"));
            email.To.Add(new MailboxAddress(user.Name, request.email));

            email.Subject = "Password reset";
            email.Body = new TextPart("plain")
            {
                Text = body
            };

            using (var smtp = new SmtpClient())
            {
                try
                {
                    smtp.Connect("localhost", 1025, MailKit.Security.SecureSocketOptions.None);

                    smtp.Send(email);
                    smtp.Disconnect(true);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Błąd wysyłania wiadomości e-mail: {ex.Message}");
                    return false;
                }
            }
            return true;

        }
    }
}
