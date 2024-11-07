using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class DiscountDto
    {
        public int Id { get; set; }
        [Required]
        public int ValueReduced { get; set; }
        [Required]
        public String Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public DateTime Expiry { get; set; }
    }
}
