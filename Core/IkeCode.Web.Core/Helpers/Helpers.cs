using IkeCode.Web.Core.CustomAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace IkeCode
{
    public static class Helpers
    {
        public static UrlHelper UrlHelper { get { return GetUrlHelper(); } }

        public static UrlHelper GetUrlHelper()
        {
            var httpContext = new HttpContextWrapper(HttpContext.Current);
            return new UrlHelper(new RequestContext(httpContext, CurrentRoute(httpContext)));
        }

        public static RouteData CurrentRoute(HttpContextWrapper httpContext)
        {
            return RouteTable.Routes.GetRouteData(httpContext);
        }

        public static Dictionary<object, object> EnumToDictionary(string enumName, string enumNamespace = "", string assemblyName = "")
        {
            var qualifiedName = "";
            var name = enumName;

            if (!string.IsNullOrWhiteSpace(enumNamespace))
            {
                name = string.Format(".{0}.{1}", enumNamespace, enumName);
            }

            if (!string.IsNullOrWhiteSpace(assemblyName))
            {
                var assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(i => i.FullName.Contains(assemblyName));
                qualifiedName = assembly.GetName().Name + name + ", " + assembly.FullName;
            }
            else
            {
                qualifiedName = name;
            }

            var enumType = Type.GetType(qualifiedName);
            var enumValues = Enum.GetValues(enumType);

            var result = new Dictionary<object, object>();

            foreach (var field in enumType.GetFields(BindingFlags.Static | BindingFlags.GetField | BindingFlags.Public))
            {
                if (field.GetCustomAttribute<DontParseHtml>(true) != null) continue;

                var value = (int)field.GetValue(null);
                var names = Enum.GetName(enumType, value);

                var attrs = field.GetCustomAttributes(typeof(DisplayAttribute), true);
                if (attrs.Count() > 0)
                {
                    foreach (DisplayAttribute currAttr in attrs)
                    {
                        result.Add(value, currAttr.Name);
                        break;
                    }
                }
                else
                {
                    result.Add(field.Name, value);
                }
            }

            return result;
        }
    }
}
