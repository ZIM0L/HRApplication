using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Commands.ResetPassword
{
    public class ResetPasswordHandler : IRequestHandler<ResetPasswordRequest, ErrorOr<bool>>
    {
        private readonly IUserRepository _userRepository;
        public ResetPasswordHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<bool>> Handle(ResetPasswordRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            if (_userRepository.GetUserByResetToken(request.token) is not User user)
            {
                return CustomErrorOr.CustomErrors.User.InvalidToken;    
            }
            if (user.ResetTokenExpiry < DateTime.UtcNow)
            {
                return CustomErrorOr.CustomErrors.User.TokenExpired;
            }
            user.Password = request.newPassword;
            user.ResetToken = null;
            user.ResetTokenExpiry = null;

            _userRepository.UpdateUser(user);

            return true;
        }
    }
}
