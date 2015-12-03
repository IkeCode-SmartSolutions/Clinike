using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Clinike.Admin.Base;
using Microsoft.Owin.Security;
using IkeCode.Clinike.Data.Models;
using IkeCode.Clinike.Admin.Web.ViewModels;
using IkeCode.Clinike.Admin.Web.Models;
using IkeCode.Data.Core.Model;
using IkeCode.Core.Helpers;
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
        public JsonResult Get(int id)
        {
            return base.Run<JsonResult>("PhoneController.Get(id)",
                () =>
                {
                    try
                    {
                        var phone = Phone.Find(i => i.Id == id);
                        
                        return Json(phone, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new Phone();
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }, id);
        }

        [Authorize(Roles = "Admin")]
        public JsonResult GetList(int personId, int offset = 0, int limit = 10)
        {
            return base.Run<JsonResult>("PhoneController.GetList(personId)",
                () =>
                {
                    try
                    {
                        var phones = Phone.FindAll(i => i.PersonId == personId, offset, limit);
                        var result = new JsonListModel<Phone>(phones);

                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new JsonListModel<Phone>(ex.Message);
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }, personId);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public JsonResult Post(Phone phone)
        {
            return base.Run<JsonResult>("PhoneController.PostPhone(id)",
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
        public JsonResult Delete(int id)
        {
            return base.Run<JsonResult>("PhoneController.DeletePhone(id)",
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