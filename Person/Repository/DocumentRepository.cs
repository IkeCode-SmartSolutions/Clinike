using IkeCode.Clinike.Person.Domain.Entities;
using IkeCode.Clinike.Person.Domain.Repository;
using IkeCode.Data.Core.Repository;
using System.Data.Entity;

namespace IkeCode.Clinike.Person.Repository
{
    public class DocumentRepository : IkeCodeRepositoryBase<Document, IDocument, int>, IDocumentRepository
    {
        public DocumentRepository(DbContext context)
            : base(context)
        {

        }
    }
}
