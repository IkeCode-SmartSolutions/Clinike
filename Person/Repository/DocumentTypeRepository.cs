using IkeCode.Clinike.Person.Domain.Entities;
using IkeCode.Clinike.Person.Domain.Repository;
using IkeCode.Data.Core.Repository;
using System.Data.Entity;

namespace IkeCode.Clinike.Person.Repository
{
    public class DocumentTypeRepository : IkeCodeRepositoryBase<DocumentType, IDocumentType, int>, IDocumentTypeRepository
    {
        public DocumentTypeRepository(DbContext context)
            : base(context)
        {

        }
    }
}
