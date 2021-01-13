using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Angularjs.Models;

namespace Project_Angularjs.Controllers
{
    public class HomeController : Controller
    {
        //private readonly ApplicationDbContext db;
        //public HomeController(ApplicationDbContext db)
        //{
        //    this.db = db;
        //}
        public IActionResult Index()
        {
            //if (!db.Database.CanConnect())
            //{
            //    db.Database.EnsureCreated();
            //    new ApplicationDbInitializer().Seed(db);

            //}
            return View();
        }
    }
}