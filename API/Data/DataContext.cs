using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<UserFollow> Follows { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserFollow>()
            .HasKey(k => new { k.SourceUserId, k.FollowedUserId });
            builder.Entity<UserFollow>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.FollowedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<UserFollow>()
            .HasOne(s => s.FollowedUser)
            .WithMany(l => l.FollowedByUsers)
            .HasForeignKey(s => s.FollowedUserId)
            .OnDelete(DeleteBehavior.NoAction);

        }
    }
}