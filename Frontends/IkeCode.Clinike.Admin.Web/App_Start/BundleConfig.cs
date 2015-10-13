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
            jsBundles.Include("~/Scripts/jquery.ext.js");
            jsBundles.Include("~/Scripts/bootstrap.min.js");
            jsBundles.Include("~/Scripts/common.js");
            //plugins
            jsBundles.Include("~/Scripts/bootstrap.file-input.js");
            jsBundles.Include("~/plugins/jquery-ui/jquery-ui.min.js");
            jsBundles.Include("~/plugins/jquery-ui/i18n/jquery.ui.datepicker-pt-BR.min.js");
            jsBundles.Include("~/plugins/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.min.js");
            jsBundles.Include("~/plugins/jquery-ui-timepicker-addon/i18n/jquery-ui-timepicker-addon-i18n.min.js");
            jsBundles.Include("~/plugins/jquery-knob/jquery.knob.min.js");
            jsBundles.Include("~/plugins/bootstrapvalidator/bootstrapValidator.min.js");
            jsBundles.Include("~/plugins/d3/d3.min.js");
            jsBundles.Include("~/plugins/datatables/jquery.dataTables.min.js");
            jsBundles.Include("~/plugins/datatables/ZeroClipboard.js");
            jsBundles.Include("~/plugins/datatables/TableTools.js");
            jsBundles.Include("~/plugins/datatables/dataTables.bootstrap.js");
            jsBundles.Include("~/plugins/fancybox/jquery.fancybox.js");
            jsBundles.Include("~/plugins/fineuploader/jquery.fineuploader-5.0.5.min.js");
            jsBundles.Include("~/plugins/moment/moment-with-locales.min.js");
            jsBundles.Include("~/plugins/fullcalendar/fullcalendar.min.js");
            jsBundles.Include("~/plugins/fullcalendar/lang/pt-br.js");
            jsBundles.Include("~/plugins/justified-gallery/jquery.justifiedGallery.min.js");
            jsBundles.Include("~/plugins/raphael/raphael-min.js");
            jsBundles.Include("~/plugins/morris/morris.min.js");
            jsBundles.Include("~/plugins/select2/select2.min.js");
            jsBundles.Include("~/plugins/select2/select2_locale_pt-PT.js");


            jsBundles.Include("~/Scripts/jtable/jquery.jtable.js");
            jsBundles.Include("~/Scripts/jtable/localization/jquery.jtable.pt-BR.js");
            jsBundles.Include("~/Scripts/knockout-{version}.js");
            bundles.Add(jsBundles);

            var styleBundle = new StyleBundle("~/cssBundles/styles");
            styleBundle.Orderer = new AsDefinedBundleOrderer();
            styleBundle.Include("~/Content/bootstrap.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/plugins/jquery-ui/jquery-ui.min.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/plugins/fancybox/jquery.fancybox.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/plugins/fullcalendar/fullcalendar.min.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/plugins/justified-gallery/justifiedGallery.min.js", new CssRewriteUrlTransform());
            styleBundle.Include("~/plugins/select2/select2.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/bootstrap.theme.css", new CssRewriteUrlTransform());

            styleBundle.Include("~/Content/common.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Scripts/jtable/themes/metro/lightgray/jtable.min.css", new CssRewriteUrlTransform());
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
