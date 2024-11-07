using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class AddItemToCartRequest
    {
        public int ShirtId { get; set; }
        public int Quantity { get; set; }
        public string Color { get; set; }
    }
}

