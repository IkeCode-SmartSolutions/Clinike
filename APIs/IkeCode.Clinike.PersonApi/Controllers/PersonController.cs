using IkeCode.Clinike.Data.Models;
using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IkeCode.Clinike.PersonApi.Controllers
{
    public class PersonController : ApiController
    {
        // GET api/person?children=foo,bar&offset=0&limit=10
        public PagedResult<Person> Get(string children = "NaturalPerson,LegalPerson,Doctor", int offset = 0, int limit = 10)
        {
            string[] childrenArray = null;

            if (!string.IsNullOrWhiteSpace(children))
            {
                childrenArray = children.Split(',');
            }

            var person = Person.GetAll(offset, limit, childrenArray);
            
            return person.ToPagedResult();
        }

        // GET api/person/5?includeChildren=true
        public Person Get(int id, string children = "NaturalPerson,LegalPerson,Doctor")
        {
            string[] childrenArray = null;

            if (!string.IsNullOrWhiteSpace(children))
            {
                childrenArray = children.Split(',');
            }

            var person = Person.Get(id, childrenArray);

            return person;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
