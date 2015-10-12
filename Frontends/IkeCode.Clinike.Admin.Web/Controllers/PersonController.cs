﻿using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Migrations;
using Clinike.Admin.Base;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Microsoft.Owin.Security;
using IkeCode.Clinike.Data.Models;
using IkeCode.Clinike.Admin.Web.ViewModels;
using IkeCode.Clinike.Admin.Web.Models;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    [Authorize]
    public class PersonController : BaseAuthController
    {
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

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
                this.Run<PersonViewModel>("PersonController.Index(id)",
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
                this.Run("PersonController.Post(id)",
                    () =>
                    {
                        Person.AddOrUpdate(i => i.Id, person);

                        vm.Person = Person.Get(person.Id, new List<string>
                                                              {
                                                                  "NaturalPerson",
                                                                  "LegalPerson",
                                                                  "Doctor"
                                                              });
                    }, person.Id);
                //vm.Notify = new NotifyViewModel("Cadastro salvo com sucesso!");
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
                    var result = base.JTableResult<Address>(
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
                    var result = base.JTableResult<Address>(
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
        public JsonResult PostPhone(Phone phone)
        {
            return base.Run<JsonResult>("PersonController.PostPhone(id)",
                () =>
                {
                    var result = base.JTableResult<Phone>(
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
                    var result = base.JTableResult<Phone>(
                    () =>
                    {
                        if (id <= 0)
                            throw new ArgumentException("Parameter -> Phone.Id is required");

                        Phone.Delete(id);
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
                    var result = base.JTableResult<Document>(
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
                    var result = base.JTableResult<Document>(
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
        public JsonResult GetPhones(int personId)
        {
            return base.Run<JsonResult>("PersonController.GetPhones(personId)",
                () =>
                {
                    try
                    {
                        var phones = Phone.FindAll(i => i.PersonId == personId);
                        var result = new JTableListModel<Phone>(phones).ToJson();

                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new JTableListModel<Phone>(ex.Message);
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }, personId);
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
                        var result = new JTableListModel<Document>(documents).ToJson();

                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new JTableListModel<Document>(ex.Message);
                        return Json(result, JsonRequestBehavior.AllowGet);
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
                        var result = new JTableListModel<Address>(addresses).ToJson();

                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        var result = new JTableListModel<Address>(ex.Message);
                        return Json(result, JsonRequestBehavior.AllowGet);
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