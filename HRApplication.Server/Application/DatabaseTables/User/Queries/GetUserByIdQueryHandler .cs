using ErrorOr;
using HRApplication.Server.Application.CustomErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using MediatR;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, ErrorOr<User>>
{
    private readonly IUserRepository _userRepository;

    public GetUserByIdQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<User>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;
        if (_userRepository.GetUserById(query.id) is not User user)
        {
            return CustomErrors.User.UserNotFound;
        }

        return user;
    }
}
