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
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult List()
        {
            ViewBag.Title = "Lista de Pessoas";
            SetPageTitle("Pessoas", "fa-users");
            return View();
        }

        public ActionResult Detail(int id = 0)
        {
            ViewBag.Title = "Detalhe de Pessoa";
            SetPageTitle(string.Format("Detalhe de Pessoa [Id: {0}]", id), "fa-user");
            return View(id);
        }
    }
}