namespace IkeCode.Clinike.Person.Api.Controllers
{
    using IkeCode.Api.Core;
    using Domain.Entities;
    using Domain.Repository;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Core;
    using System.Linq;
    using System;
    public class DocumentTypeController : IkeCodeApiController
    {
        IDocumentTypeRepository _documentTypeRepository;

        public DocumentTypeController(IDocumentTypeRepository documentTypeRepository)
        {
            _documentTypeRepository = documentTypeRepository;
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IDocumentType>> Get(int id, int offset = 0, int limit = 10, string include = "Documents")
        {
            return await RunAsync(async () =>
            {
                if (id <= 0)
                {
                    throw new ArgumentException("Parameter 'id' is required for this request.");
                }

                return await _documentTypeRepository.FindAsync(i => i.Id == id, includes: include);
            });
        }

        [HttpPost]
        public async Task<IIkeCodeApiResponse<int>> Post([FromBody]Repository.DocumentType documentType)
        {
            return await RunAsync(async () =>
            {
                if (documentType == null)
                {
                    throw new ArgumentException("Parameter 'documentType' cannot be null.");
                }
                else if (documentType.Id > 0)
                {
                    throw new ArgumentException("Invalid parameter 'documentType'. Please review if it have 'Id' property filled (in this case, use PUT method on the same endpoint).");
                }

                return await _documentTypeRepository.SaveAsync(i => i.Id, documentType);
            });
        }

        [HttpPut]
        public async Task<IIkeCodeApiResponse<int>> Put(int id, [FromBody]Repository.DocumentType documentType)
        {
            return await RunAsync(async () =>
            {
                if (documentType == null)
                {
                    throw new ArgumentException("Parameter 'documentType' cannot be null.");
                }
                else if (documentType.Id <= 0)
                {
                    throw new ArgumentException("Property 'Id' is required.");
                }

                return await _documentTypeRepository.UpdateAsync(id, documentType);
            });
        }

        [HttpDelete]
        public async Task<IIkeCodeApiResponse<int>> Delete(int id)
        {
            return await RunAsync(async () =>
            {
                if (id <= 0)
                {
                    throw new ArgumentException("Parameter 'id' is required. Must to be greate than 0 (zero).");
                }

                return await _documentTypeRepository.DeleteAsync(id);
            });
        }
    }
}
