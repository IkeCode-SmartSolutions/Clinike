using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using IkeCode.Clinike.Admin.Web.Models;
using IkeCode.Clinike.Data.Models;
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