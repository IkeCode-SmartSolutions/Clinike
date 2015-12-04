using IkeCode.Web.Core.Mvc;
using System.Web.Optimization;

namespace IkeCode.Clinike.Admin.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var jsBundles = new ScriptBundle("~/jsBundles/jquery");
            jsBundles.Orderer = new AsDefinedBundleOrderer();
            jsBundles.Include("~/Scripts/modernizr-{version}.js");
            jsBundles.Include("~/Scripts/jquery-{version}.js");
            jsBundles.Include("~/Scripts/linq.js");
            jsBundles.Include("~/Scripts/bootstrap.js");
            jsBundles.Include("~/Scripts/jquery-ui.js");
            jsBundles.Include("~/Scripts/jquery.ikecode.extenders.js");

            //plugins
            jsBundles.Include("~/Scripts/jquery.cookie.js");
            jsBundles.Include("~/Scripts/jquery.bootgrid.js");
            jsBundles.Include("~/Scripts/jquery.bootgrid.fa.js");
            jsBundles.Include("~/Scripts/bootstrap.file-input.js");
            jsBundles.Include("~/Scripts/plugins/bootstrapvalidator/bootstrapValidator.min.js");
            jsBundles.Include("~/Scripts/plugins/jquery.mask-1.13.4.js");

            jsBundles.Include("~/Scripts/plugins/snarl.js");
            jsBundles.Include("~/Scripts/moment.js");
            jsBundles.Include("~/Scripts/fullcalendar.js");
            jsBundles.Include("~/Scripts/gcal.js");
            jsBundles.Include("~/Scripts/lang/pt-br.js");

            jsBundles.Include("~/Scripts/knockout-{version}.js");
            jsBundles.Include("~/Scripts/knockout.mapping-latest.js");
            jsBundles.Include("~/Scripts/knockout.validation.js");

            jsBundles.Include("~/Scripts/ApiConfigs.js");
            jsBundles.Include("~/Scripts/Models/EnumCache.js");
            jsBundles.Include("~/Scripts/Models/PocoModels.js");
            jsBundles.Include("~/Scripts/Models/ConfirmModalModel.js");
            jsBundles.Include("~/Scripts/common.js");
            jsBundles.Include("~/Scripts/DataGridHelper.js");
            jsBundles.Include("~/Scripts/Models/BaseDataGridModel.js");
            bundles.Add(jsBundles);

            var styleBundle = new StyleBundle("~/cssBundles/styles");
            styleBundle.Orderer = new AsDefinedBundleOrderer();
            styleBundle.Include("~/Content/bootstrap.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/jquery-ui.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/bootstrap.theme.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/snarl.min.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/fullcalendar.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/jquery.bootgrid.css", new CssRewriteUrlTransform());

            styleBundle.Include("~/Content/common.css", new CssRewriteUrlTransform());
            bundles.Add(styleBundle);

            var loginStyleBundle = new StyleBundle("~/cssBundles/loginStyles");
            loginStyleBundle.Orderer = new AsDefinedBundleOrderer();
            loginStyleBundle.Include("~/Content/login/css/main.css", new CssRewriteUrlTransform());
            loginStyleBundle.Include("~/Content/login/css/style.css", new CssRewriteUrlTransform());
            loginStyleBundle.Include("~/Content/login/css/animate-custom.css", new CssRewriteUrlTransform());
            bundles.Add(loginStyleBundle);
        }
    }
}
