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
                        var person = Person.Find(i => i.Id == id, includes: new string[]
                                                    {
                                                        "NaturalPerson",
                                                        "LegalPerson",
                                                        "Doctor"
                                                    });

                        if (person == null)
                            return null;

                        vm = new PersonViewModel(person);
                        return vm;
                    }, id);
            }

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult Post(PersonViewModel personVm)
        {
            if (personVm != null)
            {
                Run("PersonController.Post(id)",
                    () =>
                    {
                        personVm.SaveProfileImage();

                        Person.AddOrUpdate(i => i.Id, personVm.Person);

                        NotificationViewModel.AddToCookie("Processo finalizado com sucesso!", "Sucesso!", 10000, NotificationIconType.Success);
                    }, personVm.Person.Id);

                return RedirectToRoute("Person", new { id = personVm.Person.Id });
            }
            else
            {
                NotificationViewModel.AddToCookie("Ocorreu um problema ao salvar o registro!", iconType: NotificationIconType.Error);
            }

            return RedirectToRoute("Error", new { RedirectUrl = string.Format("~/cadastro/pessoa") });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult PostNaturalPerson(NaturalPerson person)
        {
            if (person != null)
            {
                Run("PersonController.Post(id)",
                    () =>
                    {
                        NaturalPerson.AddOrUpdate(i => i.Id, person);

                        NotificationViewModel.AddToCookie("Processo finalizado com sucesso!", "Sucesso!", 10000, NotificationIconType.Success);
                    }, person.Id);

                return RedirectToRoute("Person", new { id = person.Id });
            }
            else
            {
                NotificationViewModel.AddToCookie("Ocorreu um problema ao salvar o registro!", iconType: NotificationIconType.Error);
            }

            return RedirectToRoute("Error", new { RedirectUrl = string.Format("~/cadastro/pessoa") });
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult PostLegalPerson(LegalPerson person)
        {
            if (person != null)
            {
                Run("PersonController.PostLegalPerson(id)",
                    () =>
                    {
                        LegalPerson.AddOrUpdate(i => i.Id, person);

                        NotificationViewModel.AddToCookie("Processo finalizado com sucesso!", "Sucesso!", 10000, NotificationIconType.Success);
                    }, person.Id);

                return RedirectToRoute("Person", new { id = person.Id });
            }
            else
            {
                NotificationViewModel.AddToCookie("Ocorreu um problema ao salvar o registro!", iconType: NotificationIconType.Error);
            }

            return RedirectToRoute("Error", new { RedirectUrl = string.Format("~/cadastro/pessoa") });
        }
    }
}