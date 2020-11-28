using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<School> Schools { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<UserFollow> Follows { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                        .HasMany(ur => ur.UserRoles)
                        .WithOne(u => u.User)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();
            builder.Entity<AppRole>()
                        .HasMany(ur => ur.UserRoles)
                        .WithOne(u => u.Role)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

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

            builder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(m => m.MessagesReceived)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Message>()
            .HasOne(u => u.Sender)
            .WithMany(m => m.MessagesSent)
            .OnDelete(DeleteBehavior.NoAction);


        }
    }
}