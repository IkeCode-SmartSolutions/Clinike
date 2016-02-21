using IkeCode.Clinike.DataContext;
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
        public int Save(int id, string email, string name)
        {
            using (var context = new ClinikeContext())
            {
                var person = new Person(context);
                person.Id = id;
                person.Email = email;
                person.Name = name;

                person.Save(i => i.Id == id);
                return person.Id;
            }
        }
    }
}
