namespace API.Helpers
{
    public class UserParams:PaginationParams
    {
        
        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public int SchoolId { get; set; }
        public int ClassId { get; set; }
        public string City { get; set; }
        public string OrderBy { get; set; } = "lastActive";

    }
}