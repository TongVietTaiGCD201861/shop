using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Purchase
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Size { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int Total { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Address { get; set; }

        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string PaymentMethod { get; set; }
        [Required]
        public string AccountBuy { get; set; }

    }
}
