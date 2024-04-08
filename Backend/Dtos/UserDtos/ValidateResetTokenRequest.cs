using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos.UserDtos;

public class ValidateResetTokenRequest
{
    [Required]
    public string Token { get; set; }
}