namespace API.Entities
{
    public class PostLike
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public UserPost LikedPost { get; set; }
        public int LikedPostId { get; set; }
    }
}