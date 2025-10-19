using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Courier
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourierId { get; set; }
        public string CourierName { get; set; }
        public float CurrentDeliveryCharge { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
