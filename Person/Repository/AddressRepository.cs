using IkeCode.Clinike.Person.Domain.Entities;
using IkeCode.Clinike.Person.Domain.Repository;
using IkeCode.Data.Core.Repository;
using System.Data.Entity;

namespace IkeCode.Clinike.Person.Repository
{
    public class AddressRepository : IkeCodeRepositoryBase<Address, IAddress, int>, IAddressRepository
    {
        public AddressRepository(DbContext context)
            : base(context)
        {

        }
    }
}
