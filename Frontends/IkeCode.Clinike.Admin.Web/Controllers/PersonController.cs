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
    public class PersonController : BaseAuthController
    {
        public PersonController()
            : base()
        {
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult Index(int id = 0)
        {
            var vm = new PersonViewModel();
            
            if (id > 0)
            {
                Run("PersonController.Index(id)",
                    () =>
                    {
                        var person = Person.Get(id, new string[]
                                                    {
                                                        "NaturalPerson",
                                                        "LegalPerson",
                                                        "Doctor"
                                                    });

                        if (person == null)
                            return null;

                        vm.Person = person;
                        return vm;
                    }, id);
            }

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult Post(Person person)
        {
            var vm = new PersonViewModel();
            if (person != null)
            {
                Run("PersonController.Post(id)",
                    () =>
                    {
                        Person.AddOrUpdate(i => i.Id, person);

                        vm.Person = Person.Get(person.Id);
                    }, person.Id);
            }
            else
            {
                //vm.Notify = new NotifyViewModel("Ocorreu um problema ao salvar o registro!", theme: "red");
            }
            return View("Index", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult PostNaturalPerson(NaturalPerson person)
        {
            var vm = new PersonViewModel();
            if (person != null)
            {
                Run("PersonController.Post(id)",
                    () =>
                    {
                        NaturalPerson.AddOrUpdate(i => i.Id, person);

                        //vm.Person = NaturalPerson.Get(person.Id);
                    }, person.Id);
            }
            else
            {
                //vm.Notify = new NotifyViewModel("Ocorreu um problema ao salvar o registro!", theme: "red");
            }
            return View("Index", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult PostDoctor(Doctor doctor)
        {
            var vm = new PersonViewModel();
            if (doctor != null)
            {
                Run("PersonController.PostDoctor(id)",
                    () =>
                    {
                        Doctor.AddOrUpdate(i => i.Id, doctor);

                        //vm.Person = Doctor.Get(person.Id);
                    }, doctor.Id);
            }
            else
            {
                //vm.Notify = new NotifyViewModel("Ocorreu um problema ao salvar o registro!", theme: "red");
            }
            return View("Index", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult PostLegalPerson(LegalPerson person)
        {
            var vm = new PersonViewModel();
            if (person != null)
            {
                Run("PersonController.PostLegalPerson(id)",
                    () =>
                    {
                        LegalPerson.AddOrUpdate(i => i.Id, person);

                        //vm.Person = LegalPerson.Get(person.Id);
                    }, person.Id);
            }
            else
            {
                //vm.Notify = new NotifyViewModel("Ocorreu um problema ao salvar o registro!", theme: "red");
            }
            return View("Index", vm);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public JsonResult PostAddress(Address address)
        {
            return base.Run<JsonResult>("PersonController.PostAddress(id)",
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
        public JsonResult DeleteAddress(int id)
        {
            return base.Run<JsonResult>("PersonController.DeleteAddress(id)",
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

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public JsonResult PostDocument(Document document)
        {
            return base.Run<JsonResult>("PersonController.PostDocument(id)",
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
        public JsonResult DeleteDocument(int id)
        {
            return base.Run<JsonResult>("PersonController.DeleteDocument(id)",
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
        public JsonResult GetDocuments(int personId)
        {
            return base.Run<JsonResult>("PersonController.GetDocuments(personId)",
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

        [Authorize(Roles = "Admin")]
        public JsonResult GetAddresses(int personId)
        {
            return base.Run<JsonResult>("PersonController.GetAddresses(personId)",
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