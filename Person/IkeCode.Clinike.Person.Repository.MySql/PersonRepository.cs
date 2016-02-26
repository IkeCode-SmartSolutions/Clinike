using IkeCode.Clinike.Person.Domain.Repository;
using IkeCode.Data.Core.Repository;
using System.Data.Entity;

namespace IkeCode.Clinike.Person.Repository
{
    public class PersonRepository : IkeCodeRepositoryBase<Domain.Entities.Person, int>, IPersonRepository
    {
        public PersonRepository(DbContext context)
            : base(context)
        {

        }
    }
}
