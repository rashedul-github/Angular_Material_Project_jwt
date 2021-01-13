using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Angularjs.Models
{
    public class ApplicationDbInitializer
    {
        public static async void Seed(ApplicationDbContext db)
        {
            string[] roles = new string[] { "Admin", "Staff"};
            //var roleStore = new RoleStore<IdentityRole>(db);
            foreach (string r in roles)
            {
                if (!db.Roles.Any(x => x.Name == r))
                {
                    db.Roles.Add(new IdentityRole { Name = r, NormalizedName = r.ToUpper() });
                }
            }

            if (!db.Users.Any(x => x.UserName == "Admin"))
            {
                var userStore = new UserStore<IdentityUser>(db);
                var hasher = new PasswordHasher<IdentityUser>();
                var user = new IdentityUser { UserName = "admin", NormalizedUserName = "ADMIN" };
                user.PasswordHash = hasher.HashPassword(user, "@Open1234");
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "Admin");

            }
            if (!db.Users.Any(x => x.UserName == "Staff"))
            {
                var userStore = new UserStore<IdentityUser>(db);
                var hasher = new PasswordHasher<IdentityUser>();
                var user = new IdentityUser { UserName = "staff", NormalizedUserName = "STAFF" };
                user.PasswordHash = hasher.HashPassword(user, "@Open1234");
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "Staff");

            }
            await db.SaveChangesAsync();
        }
    }
}

