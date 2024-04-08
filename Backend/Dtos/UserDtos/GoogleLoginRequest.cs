using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos.UserDtos;

public class GoogleLoginRequest
{
    [Required]
    public string TokenId { get; set; }
}