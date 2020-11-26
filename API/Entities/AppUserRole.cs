namespace API.Entities
{
    public class AppUserRole
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}