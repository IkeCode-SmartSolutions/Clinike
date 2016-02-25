using IkeCode.Clinike.Person.Domain.Repository;
using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IkeCode.Clinike.Person.Api.Controllers
{
    public class PersonController : ApiController
    {
        IPersonRepository _personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public IPagedResult<Domain.Entities.Person> Get(int offset = 0, int limit = 10)
        {
            var personList = _personRepository.Get(offset, limit);
            return personList;
        }

        public Domain.Entities.Person Get(int id)
        {
            var person = _personRepository.Find(i => i.Id == id);
            return person;
        }
    }
}
