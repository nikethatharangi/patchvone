using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Banner
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BannerId { get; set; }
        public string BannerName { get; set; }
        public string BannerPath { get; set; }
        public string BannerText { get; set; }
    }

}