namespace API.Entities
{
    public class PostComment
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public UserPost CommentedPost { get; set; }
        public int CommentedPostId { get; set; }
        
    }
}