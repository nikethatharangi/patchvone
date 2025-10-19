using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<User> User { get; set; }
        public DbSet<NewsLetter> NewsLetters { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductsImage { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Courier> Couriers { get; set; }
        public DbSet<ProductCollection> ProductCollections { get; set; }
    }
}
