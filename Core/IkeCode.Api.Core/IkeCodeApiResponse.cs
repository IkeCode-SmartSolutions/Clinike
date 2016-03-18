using System;

namespace IkeCode.Api.Core
{
    public class IkeCodeApiResponse<TResult> : IIkeCodeApiResponse<TResult>
    {
        public TResult Content { get; private set; }
        public string Status { get; private set; }
        public string Message { get; private set; }

        public IkeCodeApiResponse(string status)
        {
            Status = status;
        }

        public IkeCodeApiResponse(string status, string message)
            : this(status)
        {
            Message = message;
        }

        public IkeCodeApiResponse(string status, TResult content)
            : this(status)
        {
            Content = content;
        }

        public IkeCodeApiResponse(string status, string message, TResult content)
            : this(status, message)
        {
            Content = content;
        }

        public IkeCodeApiResponse(IkeCodeResponseStatus status)
        {
            Status = status.ToString();
        }

        public IkeCodeApiResponse(IkeCodeResponseStatus status, string message)
            : this(status)
        {
            Message = message;
        }

        public IkeCodeApiResponse(IkeCodeResponseStatus status, TResult content)
            : this(status)
        {
            Content = content;
        }

        public IkeCodeApiResponse(IkeCodeResponseStatus status, string message, TResult content)
            : this(status, message)
        {
            Content = content;
        }
    }
}
