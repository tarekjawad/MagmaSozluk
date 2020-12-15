using System.Collections.Generic;

using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/Seed/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            var roles = new List<AppRole>{
                new AppRole{Name="Student"},
                new AppRole{Name="Teacher"},
                new AppRole{Name="SuperStudent"},
                new AppRole{Name="SuperTeacher"},
                new AppRole{Name="MonthsStudent"},
                new AppRole{Name="MonthsTeacher"},
                new AppRole{Name="YearsStudent"},
                new AppRole{Name="YearsTeacher"},
                new AppRole{Name="Moderator"},
                new AppRole{Name="Admin"}
            };
            foreach (var role in roles)
            {
              
                await roleManager.CreateAsync(role);
            }
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user,"Student");
            }
            var admin =new AppUser{
                UserName="admin"
            };
            await userManager.CreateAsync(admin,"Pa$$w0rd");
            await userManager.AddToRolesAsync(admin,new[]{"Admin","Moderator"});
        }
    }
}