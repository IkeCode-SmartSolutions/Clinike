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
    public class AddressController : BaseAuthController
    {
        public AddressController()
            : base()
        {
        }

        [Authorize(Roles = "Admin")]
        public JsonResult Get(int id)
        {
            return base.Run<JsonResult>("AddressController.Get(id)",
                () =>
                {
                    try
                    {
                        var addresses = Address.FindAll(i => i.Id == id);
                        var result = new EasyUiListModel<Address>(addresses);

                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new EasyUiListModel<Address>(ex.Message);
                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
                    }
                }, id);
        }

        [Authorize(Roles = "Admin")]
        public JsonResult GetList(int personId)
        {
            return base.Run<JsonResult>("AddressController.GetList(personId)",
                () =>
                {
                    try
                    {
                        var addresses = Address.FindAll(i => i.PersonId == personId);
                        var result = new EasyUiListModel<Address>(addresses);

                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new EasyUiListModel<Address>(ex.Message);
                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
                    }
                }, personId);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public JsonResult Post(Address address)
        {
            return base.Run<JsonResult>("AddressController.Post(id)",
                () =>
                {
                    var result = base.GridRequestResult<Address>(
                                 () =>
                                 {
                                     Address.AddOrUpdate(i => i.Id, address);
                                 }, address);

                    return Json(result, JsonRequestBehavior.AllowGet);
                }, address.Id);
        }

        [Authorize(Roles = "Admin")]
        public JsonResult Delete(int id)
        {
            return base.Run<JsonResult>("AddressController.Delete(id)",
                () =>
                {
                    var result = base.GridRequestResult<Address>(
                    () =>
                    {
                        if (id <= 0)
                            throw new ArgumentException("Parameter -> Address.Id is required");

                        Address.Delete(id);
                    }, null);

                    return Json(result, JsonRequestBehavior.AllowGet);
                }, id);
        }
    }
}