using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }
        public string PaymentCardNo { get; set; }
        public string PaymentCardExpireDate { get; set; }
        public string PaymentCardCVV { get; set; }
        public string ShippingAddress { get; set; }
        public DateTime CreateDate { get; set; }

        public ICollection<Cart> Cart { get; set; }
        public ICollection<Order> Order { get; set; }
    }
}
