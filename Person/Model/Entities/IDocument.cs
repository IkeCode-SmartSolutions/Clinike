using IkeCode.Clinike.Person.Domain.Enums;
using IkeCode.Data.Core.Model;

namespace IkeCode.Clinike.Person.Domain.Entities
{
    public interface IDocument : IIkeCodeModel<int>
    {
        string Value { get; }
        int DocumentTypeId { get; }
        IDocumentType DocumentType { get; }
        int PersonId { get; }
        IPerson Person { get; }
    }
}
