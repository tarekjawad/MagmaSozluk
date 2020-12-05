using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int SchoolId { get; set; }
        public int ClassId { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<UserFollow> FollowedByUsers { get; set; }
        public ICollection<UserFollow> FollowedUsers { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<PostLike> LikedPosts { get; set; }
        public ICollection<UserPost> UserPosts { get; set; }
        public ICollection<PostComment> PostComments { get; set; }
        public ICollection<PostLike> PostLikes { get; set; }
        public ICollection<CommentLike> CommentLikes { get; set; }

    }
}