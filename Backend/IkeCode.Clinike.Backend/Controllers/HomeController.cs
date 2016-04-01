using IkeCode.Clinike.Backend.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IkeCode.Clinike.Backend.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            SetPageTitle("Página Inicial", "fa-home");
            return View();
        }
    }
}