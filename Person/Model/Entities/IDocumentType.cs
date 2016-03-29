using IkeCode.Data.Core.Model;
using System.Collections.Generic;

namespace IkeCode.Clinike.Person.Domain.Entities
{
    public interface IDocumentType : IIkeCodeModel<int>
    {
        string Name { get; }
        ICollection<IDocument> Documents { get; }
    }
}
