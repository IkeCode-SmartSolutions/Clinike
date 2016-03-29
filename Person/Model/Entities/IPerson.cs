using IkeCode.Data.Core.Model;
using System.Collections.Generic;

namespace IkeCode.Clinike.Person.Domain.Entities
{
    public interface IPerson : IIkeCodeModel<int>
    {
        string Name { get; }
        string Email { get; }
        ICollection<IPhone> Phones { get; }
        ICollection<IAddress> Addresses { get; }
    }
}
