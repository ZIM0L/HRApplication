using ErrorOr;
using MediatR;
public record GetUserByIdQuery(Guid id) : IRequest<ErrorOr<User>>;
