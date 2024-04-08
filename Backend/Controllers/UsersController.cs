using AutoMapper;
using BackEnd.Attributes;
using BackEnd.Dtos.UserDtos;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;
    private IMapper _mapper;

    public UsersController(
        IUserService userService,
        IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate(AuthenticateRequest model)
    {
        var response = await _userService.Authenticate(model);
        return Ok(response);
    }
    
    [AllowAnonymous]
    [HttpPost("authenticate-google")]
    public async Task<ActionResult<AuthenticateResponse>> AuthenticateGoogleLogin(GoogleLoginRequest model)
    {
        var response = await _userService.AuthenticateGoogleLogin(model, Request.Headers["origin"]);
        return Ok(response);
    }
    
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest model)
    {
        await _userService.Register(model, Request.Headers["origin"]);
        return Ok(new { message = "Registration successful" });
    }
    
    [AllowAnonymous]
    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail(VerifyEmailRequest model)
    {
        await _userService.VerifyEmail(model.Token);
        return Ok(new { message = "Verify Email successful, you can now login" });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userService.GetAll();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _userService.GetById(id);
        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateRequest model)
    {
        await _userService.Update(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _userService.Delete(id);
        return Ok(new { message = "User deleted successfully" });
    }
    
    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest model)
    {
        await _userService.ForgotPassword(model, Request.Headers["origin"]);
        return Ok(new { message = "Please check your email for password reset instructions" });
    }

    [AllowAnonymous]
    [HttpPost("validate-reset-token")]
    public async Task<IActionResult> ValidateResetToken(ValidateResetTokenRequest model)
    {
        await _userService.ValidateResetToken(model);
        return Ok(new { message = "Token is valid" });
    }

    [AllowAnonymous]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest model)
    {
        await _userService.ResetPassword(model);
        return Ok(new { message = "Password reset successful, you can now login" });
    }
}
