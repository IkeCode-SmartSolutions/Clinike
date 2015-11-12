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
            jsBundles.Include("~/Scripts/bootstrap.min.js");

            //plugins
            jsBundles.Include("~/Scripts/bootstrap.file-input.js");
            jsBundles.Include("~/Scripts/plugins/jquery-ui/jquery-ui.min.js");
            jsBundles.Include("~/Scripts/plugins/jquery-ui/i18n/jquery.ui.datepicker-pt-BR.min.js");
            jsBundles.Include("~/Scripts/plugins/bootstrapvalidator/bootstrapValidator.min.js");

            jsBundles.Include("~/Scripts/plugins/jquery.easyui.min.js");
            jsBundles.Include("~/Scripts/plugins/jquery.form.js");
            jsBundles.Include("~/Scripts/plugins/jquery.accordion.js");
            jsBundles.Include("~/Scripts/plugins/jquery.calendar.js");
            jsBundles.Include("~/Scripts/plugins/jquery.combobox.js");
            jsBundles.Include("~/Scripts/plugins/jquery.datebox.js");
            jsBundles.Include("~/Scripts/plugins/jquery.draggable.js");
            jsBundles.Include("~/Scripts/plugins/jquery.droppable.js");
            jsBundles.Include("~/Scripts/plugins/jquery.linkbutton.js");
            jsBundles.Include("~/Scripts/plugins/jquery.mask-1.13.4.js");
            jsBundles.Include("~/Scripts/plugins/jquery.menu.js");
            jsBundles.Include("~/Scripts/plugins/jquery.parser.js");
            jsBundles.Include("~/Scripts/plugins/jquery.progressbar.js");
            jsBundles.Include("~/Scripts/plugins/jquery.propertygrid.js");
            jsBundles.Include("~/Scripts/plugins/jquery.resizable.js");
            jsBundles.Include("~/Scripts/plugins/jquery.slider.js");
            jsBundles.Include("~/Scripts/plugins/jquery.tabs.js");
            jsBundles.Include("~/Scripts/plugins/jquery.window.js");
            jsBundles.Include("~/Scripts/plugins/jquery.ext.js");


            jsBundles.Include("~/Scripts/knockout-{version}.js");
            jsBundles.Include("~/Scripts/knockout.mapping-latest.js");

            jsBundles.Include("~/Scripts/common.js");
            jsBundles.Include("~/Scripts/dataGridHelper.js");
            bundles.Add(jsBundles);

            var styleBundle = new StyleBundle("~/cssBundles/styles");
            styleBundle.Orderer = new AsDefinedBundleOrderer();
            styleBundle.Include("~/Content/bootstrap.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Scripts/plugins/jquery-ui/jquery-ui.min.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/bootstrap.theme.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/easyui-theme/*.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/easyui.*", new CssRewriteUrlTransform());

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
