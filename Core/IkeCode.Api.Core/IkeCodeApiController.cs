namespace IkeCode.Api.Core
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Http;

    public class IkeCodeApiController : ApiController
    {
        protected IIkeCodeApiResponse<TResponse> Run<TResponse>(Func<TResponse> func)
        {
            try
            {
                var response = func();
                return new IkeCodeApiResponse<TResponse>(IkeCodeResponseStatus.Success, response);
            }
            catch (Exception ex)
            {
                return new IkeCodeApiResponse<TResponse>(IkeCodeResponseStatus.Error, ex.Message);
            }
        }

        protected async Task<IIkeCodeApiResponse<TResponse>> RunAsync<TResponse>(Func<Task<TResponse>> func)
        {
            try
            {
                var response = await func();
                return new IkeCodeApiResponse<TResponse>(IkeCodeResponseStatus.Success, response);
            }
            catch (Exception ex)
            {
                return new IkeCodeApiResponse<TResponse>(IkeCodeResponseStatus.Error, ex.Message);
            }
        }
    }
}
