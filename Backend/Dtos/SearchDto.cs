using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class SearchDto
    {
        public string SearchItem { get; set; }

        public int BrandId { get; set; }
        public int? MinPrice { get; set; }
        public int? MaxPrice { get; set; }
    }
}
