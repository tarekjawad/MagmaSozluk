using System;
using System.Threading.Tasks;
using API.Abstract;
using API.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;
            var userId = resultContext.HttpContext.User.GetUserId();
            var uwo = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();
            var user = await uwo.UserRepository.GetUserByIdAsync(userId);
            user.LastActive = DateTime.UtcNow;
            await uwo.Complete();

        }
    }
}