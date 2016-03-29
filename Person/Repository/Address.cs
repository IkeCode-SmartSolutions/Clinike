namespace IkeCode.Clinike.Person.Repository
{
    using IkeCode.Clinike.Person.Domain.Entities;
    using Domain.Enums;
    using IkeCode.Data.Core.Model;

    public class Address : IkeCodeModel<int>, IAddress
    {
        public Address()
        {
        }

        public AddressType AddressType { get; set; }

        public string City { get; set; }

        public string Complement { get; set; }

        public string Neighborhood { get; set; }

        public string Number { get; set; }

        public string State { get; set; }

        public string Street { get; set; }

        public string ZipCode { get; set; }

        public int PersonId { get; set; }

        public virtual Person Person { get; set; }

        IPerson IAddress.Person { get { return Person; } }
    }
}
