using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace IkeCode.Clinike.Backend
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Person",
                url: "pessoa",
                defaults: new { controller = "Person", action = "List" }
            );

            routes.MapRoute(
                name: "PersonDetail",
                url: "pessoa/detalhe/{id}",
                defaults: new { controller = "Person", action = "Detail", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
