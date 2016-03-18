namespace IkeCode.Clinike.Person.Api
{
    using IkeCode.Clinike.Person.Api.ServiceInstallers;
    using IkeCode.Web.Core.IoC;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using System;
    using System.Reflection;
    using System.Web;
    using System.Web.Http;
 
    public class WebApiApplication : HttpApplication
    {
        public WebApiApplication()
        {
        }

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            
            IkeCodeWindsor.ApiInitializer(GlobalConfiguration.Configuration, Assembly.GetExecutingAssembly(), new PersonDomainInstaller());

            var settings = new JsonSerializerSettings();

            settings.Converters.Add(new StringEnumConverter());

            settings.Formatting = Formatting.Indented;
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            settings.PreserveReferencesHandling = PreserveReferencesHandling.Arrays;
            settings.NullValueHandling = NullValueHandling.Ignore;
            settings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;

            JsonConvert.DefaultSettings = () =>
            {
                return settings;
            };

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = settings;
        }

        protected void Application_PreSendRequestHeaders(object sender, EventArgs e)
        {
            HttpContext.Current.Response.Headers.Remove("X-Powered-By");
            HttpContext.Current.Response.Headers.Remove("X-AspNet-Version");
            HttpContext.Current.Response.Headers.Remove("X-AspNetMvc-Version");
            HttpContext.Current.Response.Headers.Remove("Server");
            HttpContext.Current.Response.Headers.Add("Powered-By", "IkeCode {Smart Solutions}");
        }
    }
}
