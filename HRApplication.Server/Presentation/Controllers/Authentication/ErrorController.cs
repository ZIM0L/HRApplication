
using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ReactApp1.Server.Presentation.Api.Controllers
{
    [ApiController]
    public class ErrorController : ControllerBase
    {

        protected IActionResult Problem(List<Error> errors)
        {
            if (errors.Count == 0)
            {
                return Problem();
            }
            if (errors.All(err => err.Type == ErrorType.Validation))
            {
                return ListAllValidationErrors(errors);
            }
            var firstError = errors[0];

            return Problem(firstError);
        }

        private IActionResult Problem(Error error)
        {
            var statusCode = error.Type switch
            {
                ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
                ErrorType.Conflict => StatusCodes.Status409Conflict,
                ErrorType.Validation => StatusCodes.Status400BadRequest,
                ErrorType.NotFound => StatusCodes.Status404NotFound,
                ErrorType.Forbidden => StatusCodes.Status403Forbidden,
                _ => StatusCodes.Status500InternalServerError
            };
            return Problem(statusCode: statusCode, title: error.Description);
        }

        private IActionResult ListAllValidationErrors(List<Error> errors)
        {
            var modelStateDictionary = new ModelStateDictionary();
            foreach (var error in errors)
            {
                modelStateDictionary.AddModelError($"Error.{error.Code}", error.Description);
            }
            return ValidationProblem(modelStateDictionary);
        }
    }
}
