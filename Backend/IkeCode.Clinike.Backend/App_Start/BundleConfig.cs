using IkeCode.Web.Core.Mvc;
using System.Web.Optimization;

namespace IkeCode.Clinike.Backend
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var jsBundles = new ScriptBundle("~/jsBundles/js");
            jsBundles.Orderer = new AsDefinedBundleOrderer();
            //jsBundles.Include("~/Scripts");
            jsBundles.Include("~/Scripts/bootstrap.min.js");
            jsBundles.Include("~/Scripts/pixel-admin.js");
            bundles.Add(jsBundles);

            var styleBundle = new IkeCodeStyleBundle("~/cssBundles/styles");
            styleBundle.Orderer = new AsDefinedBundleOrderer();
            //styleBundle.Include("~/Content/Css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/Css/bootstrap.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/Css/pixel-admin.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/Css/widgets.min.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/Css/rtl.css", new CssRewriteUrlTransform());
            styleBundle.Include("~/Content/Css/themes.css", new CssRewriteUrlTransform());
            bundles.Add(styleBundle);
        }
    }
}
