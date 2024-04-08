using BackEnd.Services.IServices;

namespace BackEnd.Middleware;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }
        
    public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var userId = jwtUtils.ValidateToken(token);
           
        if (userId != null) 
        {
            context.Items["User"] = await userService.GetById(userId.Value);
        }
        await _next(context);
    }
}