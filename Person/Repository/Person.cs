namespace IkeCode.Clinike.Person.Repository
{
    using System.Collections.Generic;
    using IkeCode.Clinike.Person.Domain.Entities;
    using IkeCode.Data.Core.Model;
    using System.Linq;

    public class Person : IkeCodeModel<int>, IPerson
    {
        public Person()
        {
        }

        public string Name { get; set; }

        public string Email { get; set; }

        public virtual ICollection<Phone> Phones { get; set; }

        ICollection<IPhone> IPerson.Phones { get { return Phones.Select(i => (IPhone)i).ToList(); } }

        public virtual ICollection<Address> Addresses { get; set; }

        ICollection<IAddress> IPerson.Addresses { get { return Addresses.Select(i => (IAddress)i).ToList(); } }

        public virtual ICollection<Document> Documents { get; set; }

        ICollection<IDocument> IPerson.Documents { get { return Documents.Select(i => (IDocument)i).ToList(); } }
    }
}
