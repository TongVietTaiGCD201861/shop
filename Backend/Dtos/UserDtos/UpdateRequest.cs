using System.ComponentModel.DataAnnotations;
using BackEnd.Models;

namespace BackEnd.Dtos.UserDtos;

public class UpdateRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    [Required]
    public Role Role { get; set; }
    public string Password { get; set; }
}