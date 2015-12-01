using System.Web.Mvc;
using System.Web.Routing;

namespace IkeCode.Clinike.Admin.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            #region Helpers

            routes.MapRoute(
                name: "Helpers",
                url: "helpers/{action}",
                defaults: new { controller = "Helpers" }
            );

            #endregion Helpers

            #region Person

            routes.MapRoute(
                name: "Person",
                url: "cadastro/pessoa/{id}",
                defaults: new
                {
                    controller = "Person",
                    action = "Index",
                    id = UrlParameter.Optional
                }
            );

            #endregion Person

            #region Agenda

            routes.MapRoute(
                name: "Agenda",
                url: "agenda/{id}",
                defaults: new
                {
                    controller = "Agenda",
                    action = "Index",
                    id = UrlParameter.Optional
                }
            );

            #endregion Person

            #region Account

            routes.MapRoute(
                name: "AccountIndex",
                url: "controle-de-acesso",
                defaults: new
                {
                    controller = "Account",
                    action = "Index"
                }
            );

            routes.MapRoute(
                name: "AccountRegister",
                url: "controle-de-acesso/adicionar",
                defaults: new
                {
                    controller = "Account",
                    action = "Register"
                }
            );

            routes.MapRoute(
                name: "AccountEdit",
                url: "controle-de-acesso/{id}/editar",
                defaults: new
                {
                    controller = "Account",
                    action = "Edit"
                }
            );

            routes.MapRoute(
                name: "AccountUserRoles",
                url: "controle-de-acesso/{id}/permissoes",
                defaults: new
                {
                    controller = "Account",
                    action = "UserRoles"
                }
            );

            routes.MapRoute(
                name: "AccountUserRolesPost",
                url: "controle-de-acesso/{id}/permissoes/salvar",
                defaults: new
                {
                    controller = "Account",
                    action = "UserRoles"
                }
            );

            routes.MapRoute(
                name: "AccountDelete",
                url: "controle-de-acesso/{id}/excluir",
                defaults: new
                {
                    controller = "Account",
                    action = "Delete"
                }
            );

            routes.MapRoute(
                name: "AccountLogin",
                url: "login/{actionPerformed}",
                defaults: new
                {
                    controller = "Account",
                    action = "Login",
                    actionPerformed = ""
                }
            );

            routes.MapRoute(
                name: "AccountLostPassword",
                url: "esqueci-minha-senha",
                defaults: new
                {
                    controller = "Account",
                    action = "LostPassword",
                }
            );

            routes.MapRoute(
                name: "AccountRequestLogin",
                url: "solicitar-login",
                defaults: new
                {
                    controller = "Account",
                    action = "RequestLogin",
                }
            );

            #endregion

            routes.MapRoute(
                name: "Error",
                url: "Error",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
