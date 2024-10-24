using MediatR;
using System.Windows.Input;

namespace Authentication.Queries
{
    public record LoginRecord(
        string email,
        string password
        ) : IRequest;
}
