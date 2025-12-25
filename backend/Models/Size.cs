using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Size
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SizeId { get; set; } 

        [Required]
        public string ProductCode { get; set; }

        [Required]
        public string SizeValue { get; set; } 

        [Required]
        public string StockQuantity { get; set; }
    }
}
