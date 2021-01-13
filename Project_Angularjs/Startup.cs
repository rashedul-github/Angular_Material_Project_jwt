using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Project_Angularjs.Models;

namespace Project_Angularjs
{
    public class Startup
    {
        public Startup(IConfiguration config) { this._config = config; }
        private IConfiguration _config { get; set; }
        public void ConfigureServices(IServiceCollection services)
        {
            #region identity & jwt
            services.AddDbContext<ApplicationDbContext>(
                 option => option.UseSqlServer(this._config.GetConnectionString("DefaultConnection")));


            services.AddIdentity<IdentityUser, IdentityRole>(
                    option =>
                    {
                        option.Password.RequireDigit = false;
                        option.Password.RequiredLength = 6;
                        option.Password.RequireNonAlphanumeric = false;
                        option.Password.RequireUppercase = false;
                        option.Password.RequireLowercase = false;
                    }
                ).AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddAuthentication(option => {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options => {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidAudience = this._config["Jwt:Site"],
                    ValidIssuer = this._config["Jwt:Site"],
                    IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._config["Jwt:SigningKey"]))
                };
            });
            #endregion
            services.AddDbContext<VehicleDbContext>(o => o.UseSqlServer(this._config.GetConnectionString("DbConnection")));
            services.AddCors(options => {
                options.AddPolicy("EnableCORS", builder => {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                });
            });
            services.AddMvc()
               .AddJsonOptions(options => {
                   options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                   options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
               });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env
            , VehicleDbContext db
            , ApplicationDbContext _db
            )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            if (!db.Database.CanConnect())
            {
                if (db.Database.EnsureCreated())
                {
                    DbSeeder.Seed(db);
                }
            }
            if (!_db.Database.CanConnect())
            {
                if (_db.Database.EnsureCreated())
                {
                    ApplicationDbInitializer.Seed(_db);
                }
            }

            app.UseStaticFiles();
            app.UseCors("EnableCORS");

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();
        }
    }
}
