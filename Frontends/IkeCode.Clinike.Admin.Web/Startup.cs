using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IkeCode.Clinike.Admin.Web.Startup))]
namespace IkeCode.Clinike.Admin.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
