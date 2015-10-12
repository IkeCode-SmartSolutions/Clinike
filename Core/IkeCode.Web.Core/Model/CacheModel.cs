using System;

namespace IkeCode.Web.Core.Model
{
    public class CacheModel
    {
        public TimeSpan Expiration { get; set; }
        public string Key { get; set; }
        public object Value { get; set; }
    }
}
