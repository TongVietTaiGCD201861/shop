using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Cart 
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public IList<CartItem> Items { get; set; }
    }
}
