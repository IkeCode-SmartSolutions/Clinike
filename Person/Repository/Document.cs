namespace IkeCode.Clinike.Person.Repository
{
    using IkeCode.Clinike.Person.Domain.Entities;
    using IkeCode.Data.Core.Model;
    
    public class Document : IkeCodeModel<int>, IDocument
    {
        public Document()
        {
        }

        public string Value { get; set; }

        public int DocumentTypeId { get; set; }

        public virtual DocumentType DocumentType { get; set; }

        IDocumentType IDocument.DocumentType { get { return DocumentType; } }

        public int PersonId { get; set; }

        public virtual Person Person { get; set; }

        IPerson IDocument.Person { get { return Person; } }
    }
}
