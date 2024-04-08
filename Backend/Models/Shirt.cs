using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Shirt 
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public bool Sex { get; set; }
        [Required]
        public int Price { get; set; }
    }
}
