using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
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

        // public int GetAge()
        // {
        //     return DateOfBirth.CalculateAge();
        // }
        // public string GetPhotoUrl()
        // {
        //     foreach (var photo in Photos)
        //     {
        //         if (photo.IsMain) return photo.Url;
        //         return photo.Url;
        //     }
        //     return null;
        // }
    }
}