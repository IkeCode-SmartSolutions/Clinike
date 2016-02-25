using IkeCode.Clinike.Person.Domain.Repository;
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

        public IEnumerable<Domain.Entities.Person> Get()
        {
            return new List<Domain.Entities.Person>();
        }

        public Domain.Entities.Person Get(int id)
        {
            var person = _personRepository.Find(i => i.Id == 1);
            return new Domain.Entities.Person();
        }
    }
}
