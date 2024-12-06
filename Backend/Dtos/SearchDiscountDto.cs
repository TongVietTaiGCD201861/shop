
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class SearchDiscountDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public int Reduced { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string ExpiryDate { get; set; }
    }
}
