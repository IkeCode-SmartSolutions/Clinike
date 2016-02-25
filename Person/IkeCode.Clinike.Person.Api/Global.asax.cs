namespace IkeCode.Clinike.Person.Api
{
    using Castle.Windsor;
    using Core.IoC.Installers;
    using IkeCode.Clinike.Person.Api.ServiceInstallers;
    using IkeCode.Core.IoC;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using System;
    using System.Reflection;
    using System.Web;
    using System.Web.Http;
    using System.Web.Http.Dispatcher;

    public class WebApiApplication : HttpApplication
    {
        public WebApiApplication()
        {
        }

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //var container = new WindsorContainer();
            //container.Install(new PersonDomainInstaller(), new IkeCodeWindsorControllerInstaller(Assembly.GetExecutingAssembly()));

            //GlobalConfiguration.Configuration.DependencyResolver = new IkeCodeWindsorHttpDependencyResolver(container.Kernel);
            //GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator), new IkeCodeWindsorHttpControllerActivator(container));

            IkeCodeWindsor.Initialize(GlobalConfiguration.Configuration, Assembly.GetExecutingAssembly(), new PersonDomainInstaller());

            JsonConvert.DefaultSettings = () =>
            {
                var settings = new JsonSerializerSettings();

                settings.Formatting = Formatting.Indented;
                settings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                settings.PreserveReferencesHandling = PreserveReferencesHandling.Arrays;
                settings.NullValueHandling = NullValueHandling.Ignore;
                settings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;

                settings.Converters.Add(new StringEnumConverter());

                return settings;
            };
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
