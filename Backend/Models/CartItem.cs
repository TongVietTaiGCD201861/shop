using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CartId { get; set; }
        [Required]
        public int ShirtId { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int Total { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public Shirt Shirt { get; set; }
    }

    
}
