using Clinike.Admin.Base;
using IkeCode.Clinike.Admin.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Web.Mvc;
using System.Linq;
using System.Text;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using IkeCode.Core.CustomAttributes;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    public class HelpersController : BaseController
    {
        public JsonResult GetJsonFromEnum(string enumName, string enumNamespace = "", string assemblyName = "")
        {
            return base.Run<JsonResult>("GetJsonFromEnum", () =>
            {
                var dic = Helpers.EnumToDictionary(enumName, enumNamespace, assemblyName);
                var options = SelectOptionModel.GetModelList(dic);

                return Json(new { Result = "OK", Options = options }, JsonRequestBehavior.AllowGet);
            }, enumName, enumNamespace, assemblyName);
        }

        public PartialViewResult GetConfirmModal()
        {
            return base.Run<PartialViewResult>("GetConfirmModal", () =>
            {
                return PartialView("_ConfirmModal");
            });
        }
    }
}