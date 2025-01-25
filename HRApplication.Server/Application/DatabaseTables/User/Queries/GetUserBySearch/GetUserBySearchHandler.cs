using ErrorOr;
using HRApplication.Server.Application.Interfaces.Repositories;
using HRApplication.Server.Application.Utilities;
using HRApplication.Server.Domain.Models.User;
using MediatR;

namespace HRApplication.Server.Application.DatabaseTables.Queries.GetUserBySearch
{
    public class GetUserBySearchHandler : IRequestHandler<GetUserBySearchRequest,ErrorOr<List<UserSearchDTO>>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetUserBySearchHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ErrorOr<List<UserSearchDTO>>> Handle(GetUserBySearchRequest request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;

            List<UserSearchDTO> UserList = new List<UserSearchDTO>();

            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null || string.IsNullOrEmpty(BearerChecker.CheckBearerToken(httpContext).Value.Token))
            {
                return CustomErrorOr.CustomErrors.Token.InvalidFormatError;
            }

            var BearerCheckerResult = BearerChecker.CheckBearerToken(httpContext);

            if (string.IsNullOrEmpty(request.fullName) && string.IsNullOrEmpty(request.email))
            {
                return new List<UserSearchDTO>(); 
            }

            if (request.email != null && request.email.Length != 0)
            {
                if (_userRepository.GetUserByEmail(request.email) is User user)
                {
                    if (user != null && user.UserId != Guid.Parse(BearerCheckerResult.Value.Payload.Sub))
                    {
                        UserList.Add(new UserSearchDTO(user.Name,user.Surname,user.Email));
                        return UserList;
                    }
                }
            }
            else
            {
                var fullNameArray = request.fullName.Split(' ');
                var users = _userRepository.GetUsersByNameAndSurname(fullNameArray.ToList());

                users?.ForEach(user =>
                {
                    if (user.UserId != Guid.Parse(BearerCheckerResult.Value.Payload.Sub))
                    { 
                        UserList.Add(new UserSearchDTO(user.Name, user.Surname, user.Email));
                    }
                });
            }

            return UserList;

        }
    }
}
