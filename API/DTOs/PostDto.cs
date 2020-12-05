using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public int SourceUserId { get; set; }
        public int KindId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public ICollection<PostLike> Likes { get; set; }
        public ICollection<PostComment> Comments { get; set; }
        public ICollection<CommentLike> CommentLikes { get; set; }
    }
}