namespace IkeCode.Clinike.Person.Api.Controllers
{
    using IkeCode.Api.Core;
    using Domain.Entities;
    using Domain.Repository;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Core;
    using System.Collections.Generic;
    using System.Linq;
    using DataContext;
    using System;
    public class PhoneController : IkeCodeApiController
    {
        IPhoneRepository _phoneRepository;

        public PhoneController(IPhoneRepository phoneRepository)
        {
            _phoneRepository = phoneRepository;
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IPhone>>> Get([FromUri] int[] ids, string include = "")
        {
            return await RunAsync(async () =>
            {
                if (ids.Count() == 0)
                {
                    throw new ArgumentException("Parameter 'ids' is required for this request.");
                }

                var results = await _phoneRepository.FindAllAsync(i => ids.Contains(i.Id), 0, ids.Count(), includes: include);
                return results;
            });
        }

        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IPhone>>> Get(int personId, int offset = 0, int limit = 10, string include = "")
        {
            return await RunAsync(async () =>
            {
                if (personId <= 0)
                {
                    throw new ArgumentException("Parameter 'personId' is required for this request.");
                }

                return await _phoneRepository.FindAllAsync(i => i.PersonId == personId, offset, limit, includes: include);
            });
        }

        [HttpPost]
        public async Task<IIkeCodeApiResponse<int>> Post([FromBody]Repository.Phone phone)
        {
            return await RunAsync(async () =>
            {
                if (phone == null)
                {
                    throw new ArgumentException("Parameter 'phone' cannot be null.");
                }
                else
                {
                    if (phone.Id > 0)
                    {
                        throw new ArgumentException("Invalid parameter 'phone'. Please review if it have 'Id' property filled (in this case, use PUT method on the same endpoint).");
                    }
                    else if (phone.PersonId <= 0)
                    {
                        throw new ArgumentException("Property 'personId' is required.");
                    }
                }

                return await _phoneRepository.SaveAsync(i => i.Id, phone);
            });
        }

        [HttpPut]
        public async Task<IIkeCodeApiResponse<int>> Put(int id, [FromBody]Repository.Phone phone)
        {
            return await RunAsync(async () =>
            {
                if (phone == null)
                {
                    throw new ArgumentException("Parameter 'phone' cannot be null.");
                }
                else
                {
                    if (phone.Id <= 0)
                    {
                        throw new ArgumentException("Property 'Id' is required.");
                    }
                    else if (phone.PersonId <= 0)
                    {
                        throw new ArgumentException("Property 'PersonId' is required.");
                    }
                }

                return await _phoneRepository.UpdateAsync(id, phone);
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

                return await _phoneRepository.DeleteAsync(id);
            });
        }
    }
}
