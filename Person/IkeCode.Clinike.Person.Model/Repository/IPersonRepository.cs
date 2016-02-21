using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Person.Domain.Repository
{
    public interface IPersonRepository
    {
        int Add(int id, string email, string firstName, string lastName = "");
    }
}
