namespace IkeCode.Clinike.Person.Api.Controllers
{
    using IkeCode.Api.Core;
    using Domain.Entities;
    using Domain.Repository;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Core;
    using System.Linq;
    using System;
    public class AddressController : IkeCodeApiController
    {
        IAddressRepository _addressRepository;

        public AddressController(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IAddress>>> Get([FromUri] int[] ids, string include = "")
        {
            return await RunAsync(async () =>
            {
                if (ids.Count() == 0)
                {
                    throw new ArgumentException("Parameter 'ids' is required for this request.");
                }

                var results = await _addressRepository.FindAllAsync(i => ids.Contains(i.Id), 0, ids.Count(), includes: include);
                return results;
            });
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IAddress>>> Get(int personId, int offset = 0, int limit = 10, string include = "")
        {
            return await RunAsync(async () =>
            {
                if (personId <= 0)
                {
                    throw new ArgumentException("Parameter 'personId' is required for this request.");
                }

                return await _addressRepository.FindAllAsync(i => i.PersonId == personId, offset, limit, includes: include);
            });
        }

        [HttpPost]
        public async Task<IIkeCodeApiResponse<int>> Post([FromBody]Repository.Address address)
        {
            return await RunAsync(async () =>
            {
                if (address == null)
                {
                    throw new ArgumentException("Parameter 'address' cannot be null.");
                }
                else
                {
                    if (address.Id > 0)
                    {
                        throw new ArgumentException("Invalid parameter 'address'. Please review if it have 'Id' property filled (in this case, use PUT method on the same endpoint).");
                    }
                    else if (address.PersonId <= 0)
                    {
                        throw new ArgumentException("Property 'personId' is required.");
                    }
                }

                return await _addressRepository.SaveAsync(i => i.Id, address);
            });
        }

        [HttpPut]
        public async Task<IIkeCodeApiResponse<int>> Put(int id, [FromBody]Repository.Address address)
        {
            return await RunAsync(async () =>
            {
                if (address == null)
                {
                    throw new ArgumentException("Parameter 'address' cannot be null.");
                }
                else
                {
                    if (address.Id <= 0)
                    {
                        throw new ArgumentException("Property 'Id' is required.");
                    }
                    else if (address.PersonId <= 0)
                    {
                        throw new ArgumentException("Property 'PersonId' is required.");
                    }
                }

                return await _addressRepository.UpdateAsync(id, address);
            });
        }

        [HttpDelete]
        public async Task<IIkeCodeApiResponse<int>> Delete(int id)
        {
            return await RunAsync(async () =>
            {
                if(id <= 0)
                {
                    throw new ArgumentException("Parameter 'id' is required. Must to be greate than 0 (zero).");
                }

                return await _addressRepository.DeleteAsync(id);
            });
        }
    }
}
