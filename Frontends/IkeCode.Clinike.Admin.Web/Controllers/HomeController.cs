using System.Web.Mvc;
using Clinike.Admin.Base;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}