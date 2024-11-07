using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ValueReduced { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        public DateTime Expiry { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}