using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos.UserDtos;

public class VerifyEmailRequest
{
    [Required]
    public string Token { get; set; }
}