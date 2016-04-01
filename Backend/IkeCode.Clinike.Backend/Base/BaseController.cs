using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace IkeCode.Clinike.Backend.Base
{
    public abstract class BaseController : Controller
    {
        protected void SetPageTitle(string pageTitle, string cssIcon = "")
        {
            ViewBag.PageTitle = pageTitle;
            ViewBag.PageTitleIcon = string.IsNullOrWhiteSpace(cssIcon) ? "fa-file" : cssIcon;
        }
    }
}
