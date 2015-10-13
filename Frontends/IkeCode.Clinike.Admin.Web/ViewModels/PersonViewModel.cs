using Clinike.Admin.Controllers.Base;
using IkeCode.Clinike.Data.Models;
using System.Collections.Generic;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class PersonViewModel : BaseViewModel
    {
        public Person Person { get; set; }

        public PersonViewModel()
            : base()
        {
            Person = new Person();
            Person.Doctor = Person.Doctor ?? new Doctor();
            Person.NaturalPerson = Person.NaturalPerson ?? new NaturalPerson();
            Person.LegalPerson = Person.LegalPerson ?? new LegalPerson();

            Person.Phones = Person.Phones ?? new List<Phone>();
            Person.Documents = Person.Documents ?? new List<Document>();
            Person.Addresses = Person.Addresses ?? new List<Address>();
        }

        public PersonViewModel(Person person)
            : this()
        {
            Person = person;
        }
    }
}