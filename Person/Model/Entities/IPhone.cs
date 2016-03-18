using IkeCode.Data.Core.Model;

namespace IkeCode.Clinike.Person.Domain.Entities
{
    public interface IPhone : IIkeCodeModel<int>
    {
        string Number { get; }
        string Contact { get; }
        bool AcceptSMS { get; }
        int PersonId { get; }
        IPerson Person { get; }
    }
}
