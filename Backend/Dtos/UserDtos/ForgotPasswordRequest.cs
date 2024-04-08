using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos.UserDtos;

public class ForgotPasswordRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}