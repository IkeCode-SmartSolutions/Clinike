using Castle.Windsor;
using Castle.Windsor.Installer;
using IkeCode.Core.IoC;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;

namespace IkeCode.Clinike.Person.Api
{
    public class WindsorCompositionRoot : IHttpControllerActivator
    {
        private readonly IWindsorContainer container;

        public WindsorCompositionRoot(IWindsorContainer container)
        {
            this.container = container;
        }

        public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
        {
            var controller = (IHttpController)container.Resolve(controllerType);
            request.RegisterForDispose(new Release(() => container.Release(controller)));

            return controller;
        }

        private class Release : IDisposable
        {
            private readonly Action release;

            public Release(Action release)
            {
                this.release = release;
            }

            public void Dispose()
            {
                release();
            }
        }
    }

    public class WebApiApplication : HttpApplication
    {
        private readonly WindsorContainer container;

        public WebApiApplication()
        {
            container = new WindsorContainer();
        }

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            JsonConvert.DefaultSettings = () => {
                var settings = new JsonSerializerSettings();

                settings.Formatting = Formatting.Indented;
                settings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                settings.PreserveReferencesHandling = PreserveReferencesHandling.Arrays;
                settings.NullValueHandling = NullValueHandling.Ignore;
                settings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;

                settings.Converters.Add(new StringEnumConverter());

                return settings;
            };

            GlobalConfiguration.Configuration.DependencyResolver = new IkeCodeWindsorDependencyResolver(container.Kernel);
            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator), new WindsorCompositionRoot(container));
            container.Install(FromAssembly.This());
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
