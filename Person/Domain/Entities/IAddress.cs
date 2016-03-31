using IkeCode.Clinike.Person.Domain.Enums;
using IkeCode.Data.Core.Model;

namespace IkeCode.Clinike.Person.Domain.Entities
{
    public interface IAddress : IIkeCodeModel<int>
    {
        string Street { get; }
        string Number { get; }
        string Complement { get; }
        string Neighborhood { get; }
        string ZipCode { get; }
        string City { get; }
        string State { get; }
        AddressType AddressType { get; }
        int PersonId { get; }
        IPerson Person { get; }
    }
}
