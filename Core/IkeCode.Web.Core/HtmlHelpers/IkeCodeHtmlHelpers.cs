using IkeCode.Web.Core.CustomAttributes;
using IkeCode.Web.Core.Model.Interfaces;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Web.Routing;

namespace System.Web.Mvc.Html
{
    public static class IkeCodeHtmlHelpers
    {
        public static MvcHtmlString RadioButtonForEnum<TModel, TProperty>(
                this HtmlHelper<TModel> htmlHelper,
                Expression<Func<TModel, TProperty>> expression, int columnSize = 1, bool small = true, bool onlyRadio = false)
        {
            var metaData = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);

            var sb = new StringBuilder();
            var enumType = metaData.ModelType;
            foreach (var field in enumType.GetFields(BindingFlags.Static | BindingFlags.GetField | BindingFlags.Public))
            {
                if (field.GetCustomAttribute<DontParseHtml>(true) != null) continue;

                var value = (int)field.GetValue(null);
                var name = Enum.GetName(enumType, value);

                var label = name;
                foreach (DisplayAttribute currAttr in field.GetCustomAttributes(typeof(DisplayAttribute), true))
                {
                    label = currAttr.Name;
                    break;
                }

                var id = string.Format(
                    "{0}_{1}_{2}",
                    metaData.ContainerType.Name,
                    metaData.PropertyName,
                    name
                );

                var func = expression.Compile();
                var attributes = new RouteValueDictionary();
                attributes["id"] = id;
                if (metaData.Model != null && name.Equals(metaData.Model.ToString(), StringComparison.InvariantCultureIgnoreCase))
                {
                    attributes["checked"] = "checked";
                }

                var radio = htmlHelper.RadioButtonFor(expression, value, attributes).ToHtmlString();
                if (onlyRadio)
                {
                    sb.AppendFormat("{0}", radio);
                }
                else
                {
                    sb.AppendFormat(
                        "<div class=\"col-sm-{0}\"><div class=\"radio\"><label>{1} {2}<i class=\"fa fa-circle-o {3}\"></i></label></div></div>",
                        columnSize,
                        radio,
                        HttpUtility.HtmlEncode(label),
                        small ? "small" : ""
                    );
                }
            }
            return MvcHtmlString.Create(sb.ToString());
        }

        public static MvcHtmlString PureTextDisplayForEnum<TModel, TProperty>(
               this HtmlHelper<TModel> htmlHelper,
               Expression<Func<TModel, TProperty>> expression)
        {
            var metaData = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);

            var sb = new StringBuilder();
            var enumType = metaData.ModelType;
            foreach (var field in enumType.GetFields(BindingFlags.Static | BindingFlags.GetField | BindingFlags.Public))
            {
                if (field.GetCustomAttribute<DontParseHtml>(true) != null) continue;

                var value = (int)field.GetValue(null);
                var name = Enum.GetName(enumType, value);

                if (!name.Equals(metaData.Model.ToString()))
                    continue;

                var label = name;
                foreach (DisplayAttribute currAttr in field.GetCustomAttributes(typeof(DisplayAttribute), true))
                {
                    label = currAttr.Name;
                    break;
                }

                var id = string.Format(
                    "{0}_{1}_{2}",
                    metaData.ContainerType.Name,
                    metaData.PropertyName,
                    name
                );

                var func = expression.Compile();
                var attributes = new RouteValueDictionary();
                attributes["id"] = id;

                sb.AppendFormat(label, HttpUtility.HtmlEncode(label));

                break;
            }
            return MvcHtmlString.Create(sb.ToString());
        }

        public static string Serialize(this object obj)
        {
            return JsonConvert.SerializeObject(obj, new JsonSerializerSettings() { Formatting = Formatting.None, NullValueHandling = NullValueHandling.Ignore });
        }
    }
}
