using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public float Amount { get; set; }
        public float CourierCharges { get; set; }

        [ForeignKey("Id")]
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime CreateDate { get; set; }    
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
