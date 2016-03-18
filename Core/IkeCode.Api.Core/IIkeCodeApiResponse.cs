using System;

namespace IkeCode.Api.Core
{
    public interface IIkeCodeApiResponse<TResult>
    {
        TResult Content { get; }
        string Status { get; }
        string Message { get; }
    }
}
