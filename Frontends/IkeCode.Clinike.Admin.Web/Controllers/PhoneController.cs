using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Clinike.Admin.Base;
using Microsoft.Owin.Security;
using IkeCode.Clinike.Data.Models;
using IkeCode.Clinike.Admin.Web.ViewModels;
using IkeCode.Clinike.Admin.Web.Models;
using Newtonsoft.Json;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    [Authorize]
    public class PhoneController : BaseAuthController
    {
        public PhoneController()
            : base()
        {
        }

        [Authorize(Roles = "Admin")]
        public JsonResult GetPhones(int personId)
        {
            return base.Run<JsonResult>("PersonController.GetPhones(personId)",
                () =>
                {
                    try
                    {
                        var phones = Phone.FindAll(i => i.PersonId == personId);
                        var result = new EasyUiListModel<Phone>(phones);

                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new EasyUiListModel<Phone>(ex.Message);
                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
                    }
                }, personId);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public JsonResult PostPhone(Phone phone)
        {
            return base.Run<JsonResult>("PersonController.PostPhone(id)",
                () =>
                {
                    var result = base.GridRequestResult<Phone>(
                    () =>
                    {
                        Phone.AddOrUpdate(i => i.Id, phone);
                    }, phone);

                    return Json(result, JsonRequestBehavior.AllowGet);
                }, phone.Id);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public JsonResult DeletePhone(int id)
        {
            return base.Run<JsonResult>("PersonController.DeletePhone(id)",
                () =>
                {
                    var result = base.GridRequestResult<Phone>(
                    () =>
                    {
                        if (id <= 0)
                            throw new ArgumentException("Parameter -> Phone.Id is required");

                        Phone.Delete(id);
                    }, null);

                    return Json(result, JsonRequestBehavior.AllowGet);
                }, id);
        }
    }
}