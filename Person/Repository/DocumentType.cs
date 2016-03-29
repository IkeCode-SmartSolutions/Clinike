namespace IkeCode.Clinike.Person.Repository
{
    using IkeCode.Clinike.Person.Domain.Entities;
    using IkeCode.Data.Core.Model;
    using System.Collections.Generic;
    using System.Linq;

    public class DocumentType : IkeCodeModel<int>, IDocumentType
    {
        public DocumentType()
        {
        }

        public string Name { get; set; }

        public virtual ICollection<Document> Documents { get; set; }

        ICollection<IDocument> IDocumentType.Documents { get { return Documents.Select(i => (IDocument)i).ToList(); } }
    }
}
