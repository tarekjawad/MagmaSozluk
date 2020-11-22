using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }
        [Required] public string KnownAs { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public DateTime DateOfBirth { get; set; }
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }
        [Required] public int SchoolId { get; set; }
        [Required] public string ClassId { get; set; }


        [Required]
        [StringLength(20,MinimumLength=8)]
        public string Password { get; set; }
    }
}