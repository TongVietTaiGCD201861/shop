using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class FeedbackDto
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public int IdShirt { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
    }
}
