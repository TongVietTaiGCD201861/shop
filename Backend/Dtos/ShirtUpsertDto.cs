using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class ShirtUpsertDto
    {
        internal object sex;
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public int BrandId { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public bool Sex { get; set; }
        [Required]
        public int Price { get; set; }

    }
}
