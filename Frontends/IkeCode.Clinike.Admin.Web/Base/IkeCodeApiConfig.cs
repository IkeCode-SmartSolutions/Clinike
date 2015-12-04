using IkeCode.Web.Core.Xml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.Base
{
    public class IkeCodeApiConfig : IkeCodeConfig
    {
        public IkeCodeApiConfig(string api)
            : base("IkeCodeApi.config", api)
        {

        }

        public static IkeCodeApiConfig Person { get { return new IkeCodeApiConfig("person"); } }
        public static IkeCodeApiConfig Schedule { get { return new IkeCodeApiConfig("schedule"); } }

        public string BaseUrl { get { return this.GetString("baseUrl"); } }
    }
}