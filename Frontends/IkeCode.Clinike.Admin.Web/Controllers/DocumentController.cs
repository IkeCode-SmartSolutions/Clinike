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
                        var documents = Document.FindAll(i => i.PersonId == personId, new List<string> { "DocumentType" });
                        var result = new EasyUiListModel<Document>(documents);

                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new EasyUiListModel<Document>(ex.Message);
                        return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
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
        
        [Authorize(Roles = "Admin")]
        public JsonResult GetDocumentTypes()
        {
            var docTypes = DocumentType.GetAll();

            var result = new List<JTableOptionModel>(docTypes.Count);

            foreach (var doc in docTypes)
            {
                result.Add(new JTableOptionModel() { DisplayText = doc.Name, Value = doc.Id });
            }

            return Json(new { Result = "OK", Options = result }, JsonRequestBehavior.AllowGet);
        }
    }
}