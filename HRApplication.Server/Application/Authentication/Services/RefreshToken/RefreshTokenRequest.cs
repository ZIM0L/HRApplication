using MediatR;
using ErrorOr;
using Application.Authentication;

namespace HRApplication.Server.Application.Authentication.Services.RefreshToken
{
    public record RefreshTokenRequest(string refreshToken) : IRequest<ErrorOr<AuthenticationResult>>;

}
