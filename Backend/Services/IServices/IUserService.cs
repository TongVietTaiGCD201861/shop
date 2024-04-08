using BackEnd.Dtos.UserDtos;
using BackEnd.Models;
using System.Security.Claims;

namespace BackEnd.Services.IServices;

public interface IUserService
{
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
    Task<IEnumerable<User>> GetAll();
    Task<User> GetById(int id);
    Task Register(RegisterRequest model, string origin);
    Task VerifyEmail(string token);
    Task Update(int id, UpdateRequest model);
    Task Delete(int id);
    Task ForgotPassword(ForgotPasswordRequest model, string origin);
    Task ValidateResetToken(ValidateResetTokenRequest model);
    Task ResetPassword(ResetPasswordRequest model);
    Task<AuthenticateResponse> AuthenticateGoogleLogin(GoogleLoginRequest model, string origin);
}