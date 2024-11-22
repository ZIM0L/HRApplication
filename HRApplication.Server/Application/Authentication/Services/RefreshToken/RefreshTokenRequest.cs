using ErrorOr;
using HRApplication.Server.Application.Authentication.AuthenticationResults;
using MediatR;

namespace HRApplication.Server.Application.Authentication.Services.RefreshToken
{
    public record RefreshTokenRequest() : IRequest<ErrorOr<AuthenticationResult>>;

}
