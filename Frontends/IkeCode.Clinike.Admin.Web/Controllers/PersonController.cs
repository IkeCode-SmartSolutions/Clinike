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
    }
}