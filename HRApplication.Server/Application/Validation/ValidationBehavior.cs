using ErrorOr;
using FluentValidation;
using MediatR;

namespace ReactApp1.Server.Application.Common.Bevaviors
{
    public class ValidationdBehavior<TRequest, TResponse>
       : IPipelineBehavior<TRequest, TResponse>
       where TRequest : IRequest<TResponse>
       where TResponse : notnull
    {
        private readonly IValidator<TRequest>? _validator;

        public ValidationdBehavior(IValidator<TRequest>? validator = null)
        {
            _validator = validator;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken)
        {
            //before
            if (_validator is null)
            {
                return await next();
            }
            var context = new ValidationContext<TRequest>(request);
            var validationResult = await _validator.ValidateAsync(context, cancellationToken);

            if (validationResult.IsValid)
            {
                return await next();
            }
            var errors = validationResult.Errors
                .Select(validationFailure => Error.Validation(validationFailure.PropertyName, validationFailure.ErrorMessage)).ToList();
            //after
            return (dynamic)errors;
        }
    }
}
