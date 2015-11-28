using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Clinike.Admin.Base;
using Microsoft.Owin.Security;
using IkeCode.Clinike.Data.Models;
using IkeCode.Clinike.Admin.Web.ViewModels;
using IkeCode.Clinike.Admin.Web.Models;
using IkeCode.Core.Helpers;
using Newtonsoft.Json;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    [Authorize]
    public class DocumentController : BaseAuthController
    {
        public DocumentController()
            : base()
        {
        }

        [Authorize(Roles = "Admin")]
        public JsonResult GetList(int personId)
        {
            return base.Run<JsonResult>("DocumentController.GetList(personId)",
                () =>
                {
                    try
                    {
                        var documents = Document.FindAll(i => i.PersonId == personId, 0, 10, includes: new List<string> { "DocumentType" });
                        var result = new JsonListModel<Document>(documents);

                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new JsonListModel<Document>(ex.Message);
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }, personId);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public JsonResult Post(Document document)
        {
            return base.Run<JsonResult>("DocumentController.Post(id)",
                () =>
                {
                    var result = base.GridRequestResult<Document>(
                    () =>
                    {
                        Document.AddOrUpdate(i => i.Id, document);
                    }, document);

                    return Json(result, JsonRequestBehavior.AllowGet);
                }, document.Id);
        }

        [Authorize(Roles = "Admin")]
        public JsonResult Delete(int id)
        {
            return base.Run<JsonResult>("DocumentController.Delete(id)",
                () =>
                {
                    var result = base.GridRequestResult<Document>(
                    () =>
                    {
                        if (id <= 0)
                            throw new ArgumentException("Parameter -> Document.Id is required");

                        Document.Delete(id);
                    }, null);

                    return Json(result, JsonRequestBehavior.AllowGet);
                }, id);
        }

        public JsonResult GetDocumentTypes()
        {
            var docTypes = DocumentType.GetAll().ToDictionary(i => (object)i.Id.ToString(), i => (object)i.Name);

            var result = SelectOptionModel.GetModelList(docTypes);

            return Json(new { Result = "OK", Options = result }, JsonRequestBehavior.AllowGet);
        }
    }
}