using IkeCode.Api.Core;
using IkeCode.Clinike.Person.Domain.Repository;
using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace IkeCode.Clinike.Person.Api.Controllers
{
    public class PersonController : IkeCodeApiController
    {
        IPersonRepository _personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<Domain.Entities.IPerson>> Get(string name, string include = "")
        {
            var person = await _personRepository.FindAsync(i => i.Name == name, includes: include);
            return new IkeCodeApiResponse<Domain.Entities.IPerson>(IkeCodeResponseStatus.Success, person);
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<Domain.Entities.IPerson>>> Get(int offset = 0, int limit = 10, string include = "")
        {
            var personList = await _personRepository.GetAsync(offset, limit, includes: include, orderBy: i => i.Name);
            return new IkeCodeApiResponse<IPagedResult<Domain.Entities.IPerson>>(IkeCodeResponseStatus.Success, personList);
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<Domain.Entities.IPerson>> Get(int id, string include = "")
        {
            var person = await _personRepository.FindAsync(i => i.Id == id, includes: include);
            return new IkeCodeApiResponse<Domain.Entities.IPerson>(IkeCodeResponseStatus.Success, person);
        }

        [HttpPost]
        public async Task<IIkeCodeApiResponse<int>> Post([FromBody]Domain.Entities.IPerson person)
        {
            return await Task.Run(() => { return new IkeCodeApiResponse<int>(IkeCodeResponseStatus.Success, 1); });
        }

        [HttpPut]
        public async Task Put(int id, [FromBody]Domain.Entities.IPerson person)
        {
            await Task.Run(() => { _personRepository.Update(id, person); });
        }
        
        [HttpDelete]
        public async Task Delete(int id)
        {
            await Task.Run(() => { _personRepository.Delete(id); });
        }
    }
}
