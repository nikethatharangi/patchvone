using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ProductCollection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CollectionId { get; set; }
        public string CollectionName { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<Product> Product { get; set; }
    }
}
