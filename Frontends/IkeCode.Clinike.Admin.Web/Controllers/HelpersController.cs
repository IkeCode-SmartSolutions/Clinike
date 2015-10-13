using Clinike.Admin.Base;
using IkeCode.Clinike.Admin.Web.Models;
using System.Web.Mvc;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    public class HelpersController : BaseController
    {
        public JsonResult GetJsonFromEnum(string enumName, string enumNamespace = "", string assemblyName = "")
        {
            return base.Run<JsonResult>("GetJsonFromEnum", () =>
            {
                var dic = Helpers.EnumToDictionary(enumName, enumNamespace, assemblyName);
                var options = JTableOptionModel.GetModelList(dic);

                return Json(new { Result = "OK", Options = options }, JsonRequestBehavior.AllowGet);
            }, enumName, enumNamespace, assemblyName);
        }
    }
}