using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }

        public int IdShirt { get; set; }

        public string ImgPath { get; set; }

    }
}
