using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Men
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MenClothId { get; set; }

        public string ClothName { get; set; }
        public string ClothType { get; set; }
        public string Size { get; set; }
        public string StockQuantity { get; set; }
        public float OldPrice { get; set; }
        public float NewPrice { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
