using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackEnd.Models;

public class User 
{
    public User()
    {
        Created = DateTime.UtcNow;
        IsInternal = true;
    }
    [Key]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public Role Role { get; set; }
    [JsonIgnore]
    public string PasswordHash { get; set; }
    public bool AcceptTerms { get; set; }
    public string? VerificationToken { get; set; }
    public DateTime? Verified { get; set; }
    public bool IsVerified => Verified.HasValue || PasswordReset.HasValue;
    public string? ResetToken { get; set; }
    public DateTime? ResetTokenExpires { get; set; }
    public DateTime? PasswordReset { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public bool Sex { get; set; }
    public string? Avatar { get; set; }
    public string? AvatarPublicId { get; set; }
    
    public bool IsInternal { get; set; }
} 