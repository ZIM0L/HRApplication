using ErrorOr;
using MediatR;
public record GetUserByIdQuery(Guid UserId) : IRequest<ErrorOr<User>>;
