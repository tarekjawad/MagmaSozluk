namespace API.Entities
{
    public class CommentLike
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public PostComment LikedComment { get; set; }
        public int LikedCommentId { get; set; }
    }
}