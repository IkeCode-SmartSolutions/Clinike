using IkeCode.Clinike.Person.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Person.Repository.MySql
{
    public class PersonRepository : IPersonRepository
    {
        public int Add(int id, string email, string firstName, string lastName = "")
        {
            var person = new Person();
            person.Id = id;
            person.Email = email;
            person.FirstName = firstName;
            person.LastName = lastName;

            var result = Person.AddOrUpdate(i => i.Id == id, person);
            return result.Id;
        }
    }
}
