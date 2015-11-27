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

            var obj = new NotificationViewModel("Cadastro realizado com sucesso!", "Titulo 1", 5000, NotificationIconType.Success);
            obj.AddToCookie();
            
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

                        vm = new PersonViewModel(person);

                        //if (!string.IsNullOrWhiteSpace(notificationMessage))
                        //    vm.Notification = new NotificationViewModel(notificationMessage, notificationTitle, iconType: (NotificationIconType)notificationIconType);

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
                        var notificationViewModel = NotificationViewModel.ExtractFromCookie();

                        personVm.SaveProfileImage();

                        Person.AddOrUpdate(i => i.Id, personVm.Person);
                    }, personVm.Person.Id);
            }
            else
            {
                personVm.Notification = new NotificationViewModel("Ocorreu um problema ao salvar o registro!", iconType: NotificationIconType.Error);
            }
            return RedirectToRoute("Person", new { id = personVm.Person.Id });
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
                    }, person.Id);

                return RedirectToRoute("Person", new { id = person.Id });
            }
            else
            {
                return RedirectToRoute("Person", new { id = person.Id });
            }
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
                    }, doctor.Id);
            }
            else
            {
                //vm.Notify = new NotifyViewModel("Ocorreu um problema ao salvar o registro!", theme: "red");
            }

            return RedirectToRoute("Person", new { id = doctor.Id });
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
                    }, person.Id);
            }
            else
            {
                //vm.Notify = new NotifyViewModel("Ocorreu um problema ao salvar o registro!", theme: "red");
            }

            return RedirectToRoute("Person", new { id = person.Id });
        }
    }
}