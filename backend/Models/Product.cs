using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; } //shirt,bottle,skirt
        public float? OldPrice { get; set; }
        public float NewPrice { get; set; }
        public string Color { get; set; }
        public string Category { get; set; } //women,men,unisex,Accesories
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }

        public int CollectionId { get; set; }

        [ForeignKey("CollectionId")]
        public ProductCollection ProductCollection { get; set; }


        public ICollection<ProductImage> ProductImage { get; set; }
        public ICollection<Cart> Cart { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }

        public bool isDeleted { get; set; } = false;

        [NotMapped]
        public ICollection<Size> Sizes { get; set; }
    }
}
