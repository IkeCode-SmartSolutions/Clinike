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
using System.IO;
using IkeCode.Core.Crypto;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    [Authorize]
    public class DoctorController : BaseAuthController
    {
        public DoctorController()
            : base()
        {
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult Post(DoctorViewModel doctor)
        {
            if (doctor != null && doctor.Doctor != null && doctor.PersonId > 0)
            {
                Run("DoctorController.Post(id)",
                    () =>
                    {
                        Doctor.AddOrUpdate(i => i.Id, doctor.Doctor);

                        NotificationViewModel.AddToCookie("Processo finalizado com sucesso!", "Sucesso!", 10000, NotificationIconType.Success);
                    }, doctor.Doctor.Id);

                return RedirectToRoute("Person", new { id = doctor.PersonId });
            }
            else
            {
                NotificationViewModel.AddToCookie("Ocorreu um problema ao salvar o registro!", iconType: NotificationIconType.Error);
            }

            return RedirectToRoute("Error", new { RedirectUrl = string.Format("~/cadastro/pessoa") });
        }

        public JsonResult Get(int offset = 0, int limit = 10)
        {
            return base.Run<JsonResult>("DoctorController.Get(offset, limit)",
                () =>
                {
                    try
                    {
                        var doctors = Doctor.GetAll(offset, limit, new string[] { "Person" }, true);
                        var result = new JsonListModel<Doctor>(doctors);

                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new JsonListModel<Doctor>(ex.Message);
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }, offset, limit);
        }
    }
}