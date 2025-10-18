using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<User> User { get; set; }
        public DbSet<NewsLetter> NewsLetters { get; set; }
        public DbSet<Men> Men { get; set; }
    }
}
