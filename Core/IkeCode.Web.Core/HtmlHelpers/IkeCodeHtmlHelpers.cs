﻿namespace System.Web.Mvc.Html
{
    using IkeCode.Web.Core.CustomAttributes;
    using Newtonsoft.Json;
    using System.ComponentModel.DataAnnotations;
    using System.Linq.Expressions;
    using System.Reflection;
    using System.Text;
    using System.Web.Routing;
    using System.Linq;
    using Collections.Generic;
    using Helpers;

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

        /// <summary>
        /// Returns a Javascript HTML that resister on window.Enum the desired C# Enum
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="helper"></param>
        /// <returns>Use it like this -> Enum.EnumName.EnumValue, e.g.: Enum.Status.Completed</returns>
        public static HtmlString GetEnumsAsJavascript<T>(this HtmlHelper helper) 
            where T : struct
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<script type=\"text/javascript\">");
            sb.AppendLine("if(!window.Enum) Enum = {};");

            object enumeration = Activator.CreateInstance(typeof(T));
            Dictionary<string, object> enums = typeof(T).GetFields().ToDictionary(x => x.Name, x => x.GetValue(enumeration));

            sb.AppendLine("Enum." + typeof(T).Name + " = " + Json.Encode(enums) + " ;");
            sb.AppendLine("</script>");

            return new HtmlString(sb.ToString());
        }

        public static MvcForm IkeCodeBeginForm(this HtmlHelper htmlHelper, string formAction, FormMethod method, object htmlAttributes)
        {
            TagBuilder tagBuilder = new TagBuilder("form");
            tagBuilder.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
            // action is implicitly generated, so htmlAttributes take precedence.
            tagBuilder.MergeAttribute("action", formAction);
            // method is an explicit parameter, so it takes precedence over the htmlAttributes.
            tagBuilder.MergeAttribute("method", HtmlHelper.GetFormMethodString(method), true);

            bool traditionalJavascriptEnabled = htmlHelper.ViewContext.ClientValidationEnabled
                                                && !htmlHelper.ViewContext.UnobtrusiveJavaScriptEnabled;

            if (traditionalJavascriptEnabled)
            {
                // forms must have an ID for client validation
                tagBuilder.GenerateId(new Random().Next(99999).ToString());
            }

            htmlHelper.ViewContext.Writer.Write(tagBuilder.ToString(TagRenderMode.StartTag));
            MvcForm theForm = new MvcForm(htmlHelper.ViewContext);

            if (traditionalJavascriptEnabled)
            {
                htmlHelper.ViewContext.FormContext.FormId = tagBuilder.Attributes["id"];
            }

            return theForm;
        }
    }
}
