namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string KnownAs { get; set; }
        public int SchoolId { get; set; }
        public int ClassId { get; set; }
        public string City { get; set; }
    }
}