namespace IkeCode.Clinike.Person.Api.Controllers
{
    using IkeCode.Api.Core;
    using Domain.Entities;
    using Domain.Repository;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Core;

    public class PhoneController : IkeCodeApiController
    {
        IPhoneRepository _phoneRepository;

        public PhoneController(IPhoneRepository phoneRepository)
        {
            _phoneRepository = phoneRepository;
        }
        
        [HttpGet]
        public async Task<IIkeCodeApiResponse<IPagedResult<IPhone>>> Get(int personId, int offset = 0, int limit = 10, string include = "")
        {
            return await RunAsync(async () =>
            {
                return await _phoneRepository.FindAllAsync(i => i.PersonId == personId, offset, limit, includes: include);
            });
        }

        [HttpPost]
        public async Task<IIkeCodeApiResponse<int>> Post([FromBody]Repository.Phone phone)
        {
            return await RunAsync(async () =>
            {
                return await _phoneRepository.SaveAsync(i => i.Id, phone);
            });
        }

        [HttpPut]
        public async Task<IIkeCodeApiResponse<int>> Put(int id, [FromBody]Repository.Phone phone)
        {
            return await RunAsync(async () =>
            {
                return await _phoneRepository.UpdateAsync(id, phone);
            });
        }

        [HttpDelete]
        public async Task<IIkeCodeApiResponse<int>> Delete(int id)
        {
            return await RunAsync(async () =>
            {
                return await _phoneRepository.DeleteAsync(id);
            });
        }
    }
}
