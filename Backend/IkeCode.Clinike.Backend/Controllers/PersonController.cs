using IkeCode.Clinike.Backend.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IkeCode.Clinike.Backend.Controllers
{
    public class PersonController : BaseController
    {
        // GET: Person
        public ActionResult List()
        {
            SetPageTitle("Pessoas", "fa-users");
            return View();
        }

        public ActionResult Detail(int id = 0)
        {
            SetPageTitle("Detalhe", "fa-user");
            return View();
        }
    }
}