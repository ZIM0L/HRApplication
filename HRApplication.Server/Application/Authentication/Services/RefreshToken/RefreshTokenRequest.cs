using MediatR;
using ErrorOr;
using HRApplication.Server.Application.Authentication.AuthenticationResults;

namespace HRApplication.Server.Application.Authentication.Services.RefreshToken
{
    public record RefreshTokenRequest() : IRequest<ErrorOr<AuthenticationResult>>;

}
