using Clinike.Admin.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    public class AgendaController : BaseController
    {
        // GET: Agenda
        public ActionResult Index(int doctorId = 0, int patientId = 0)
        {
            return View();
        }
    }
}