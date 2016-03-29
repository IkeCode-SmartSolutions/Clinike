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
    public class DocumentController : IkeCodeApiController
    {
        IDocumentRepository _documentRepository;

        public DocumentController(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IDocument>>> Get([FromUri] int[] ids, string include = "")
        {
            return await RunAsync(async () =>
            {
                if (ids.Count() == 0)
                {
                    throw new ArgumentException("Parameter 'ids' is required for this request.");
                }

                var results = await _documentRepository.FindAllAsync(i => ids.Contains(i.Id), 0, ids.Count(), includes: include);
                return results;
            });
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IDocument>>> Get(int personId, int offset = 0, int limit = 10, string include = "")
        {
            return await RunAsync(async () =>
            {
                if (personId <= 0)
                {
                    throw new ArgumentException("Parameter 'personId' is required for this request.");
                }

                return await _documentRepository.FindAllAsync(i => i.PersonId == personId, offset, limit, includes: include);
            });
        }

        [HttpPost]
        public async Task<IIkeCodeApiResponse<int>> Post([FromBody]Repository.Document document)
        {
            return await RunAsync(async () =>
            {
                if (document == null)
                {
                    throw new ArgumentException("Parameter 'document' cannot be null.");
                }
                else
                {
                    if (document.Id > 0)
                    {
                        throw new ArgumentException("Invalid parameter 'document'. Please review if it have 'Id' property filled (in this case, use PUT method on the same endpoint).");
                    }
                    else if (document.PersonId <= 0)
                    {
                        throw new ArgumentException("Property 'PersonId' is required.");
                    }
                }

                return await _documentRepository.SaveAsync(i => i.Id, document);
            });
        }

        [HttpPut]
        public async Task<IIkeCodeApiResponse<int>> Put(int id, [FromBody]Repository.Document document)
        {
            return await RunAsync(async () =>
            {
                if (document == null)
                {
                    throw new ArgumentException("Parameter 'document' cannot be null.");
                }
                else
                {
                    if (document.Id <= 0)
                    {
                        throw new ArgumentException("Property 'Id' is required.");
                    }
                    else if (document.PersonId <= 0)
                    {
                        throw new ArgumentException("Property 'PersonId' is required.");
                    }
                }

                return await _documentRepository.UpdateAsync(id, document);
            });
        }

        [HttpDelete]
        public async Task<IIkeCodeApiResponse<int>> Delete(int id)
        {
            return await RunAsync(async () =>
            {
                if(id <= 0)
                {
                    throw new ArgumentException("Parameter 'id' is required. Must to be greate than 0 (zero).");
                }

                return await _documentRepository.DeleteAsync(id);
            });
        }
    }
}
