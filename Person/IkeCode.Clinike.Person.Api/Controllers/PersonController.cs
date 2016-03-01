namespace IkeCode.Clinike.Person.Api.Controllers
{
    using IkeCode.Api.Core;
    using Domain.Entities;
    using Domain.Repository;
    using Data.Core.Model;
    using System.Threading.Tasks;
    using System.Web.Http;

    public class PersonController : IkeCodeApiController
    {
        IPersonRepository _personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IPerson>>> Get(string name, string include = "")
        {
            return await RunAsync(async () =>
            {
                return await _personRepository.FindAllAsync(i => i.Name.Contains(name), includes: include);
            });
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IPerson>>> Get(int offset = 0, int limit = 10, string include = "")
        {
            return await RunAsync(async () =>
            {
                return await _personRepository.GetAsync(offset, limit, includes: include);
            });
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPerson>> Get(int id, string include = "")
        {
            return await RunAsync(async () =>
            {
                return await _personRepository.FindAsync(i => i.Id == id, includes: include);
            });
        }

        [HttpPost]
        public async Task<IIkeCodeApiResponse<int>> Post([FromBody]IPerson person)
        {
            return await RunAsync(async () =>
            {
                return await Task.Run(() => { return 1; });
            });
        }

        [HttpPut]
        public async Task<IIkeCodeApiResponse<int>> Put(int id, [FromBody]IPerson person)
        {
            return await RunAsync(async () =>
            {
                return await _personRepository.UpdateAsync(id, person);
            });
        }

        [HttpDelete]
        public async Task<IIkeCodeApiResponse<int>> Delete(int id)
        {
            return await RunAsync(async () =>
            {
                return await _personRepository.DeleteAsync(id);
            });
        }
    }
}
