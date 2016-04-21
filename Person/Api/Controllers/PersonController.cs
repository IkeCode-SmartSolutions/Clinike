namespace IkeCode.Clinike.Person.Api.Controllers
{
    using IkeCode.Api.Core;
    using Domain.Entities;
    using Domain.Repository;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Core;

    public class PersonController : IkeCodeApiController
    {
        IPersonRepository _personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IPerson>>> Get(string name, int offset = 0, int limit = 10, string include = "")
        {
            return await RunAsync(async () =>
            {
                return await _personRepository.FindAllAsync(i => i.Name.Contains(name), offset, limit, includes: include);
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
        public async Task<IIkeCodeApiResponse<IPerson>> Post([FromBody]Repository.Person person)
        {
            return await RunAsync(async () =>
            {
                await _personRepository.SaveAsync(i => i.Id, person);
                return (IPerson)person;
            });
        }

        [HttpPut]
        public async Task<IIkeCodeApiResponse<IPerson>> Put(int id, [FromBody]Repository.Person person)
        {
            return await RunAsync(async () =>
            {
                await _personRepository.UpdateAsync(id, person);
                return (IPerson)person;
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
