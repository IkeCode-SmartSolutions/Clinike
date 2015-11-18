using Clinike.Admin.Base;
using IkeCode.Clinike.Admin.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Web.Mvc;
using System.Linq;
using System.Text;
using IkeCode.Web.Core.CustomAttributes;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.Controllers
{
    public class HelpersController : BaseController
    {
        public JsonResult GetJsonFromEnum(string enumName, string enumNamespace = "", string assemblyName = "")
        {
            return base.Run<JsonResult>("GetJsonFromEnum", () =>
            {
                var dic = Helpers.EnumToDictionary(enumName, enumNamespace, assemblyName);
                var options = JTableOptionModel.GetModelList(dic);

                return Json(new { Result = "OK", Options = options }, JsonRequestBehavior.AllowGet);
            }, enumName, enumNamespace, assemblyName);
        }
        StringBuilder str = new StringBuilder();
        public JsonResult GetPoco()
        {
            var allClasses = GetAllClasses();
            var allClassTypes = allClasses.Select(c => c.ClassType);

            WriteInterfaces(allClasses, allClassTypes);

            WriteClasses2(allClasses, allClassTypes);

            return Json(str.ToString(), JsonRequestBehavior.AllowGet);
        }

        class ClassDetails
        {
            public Type ClassType;
            public List<PropertyInfo> Properties;
            public List<KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>> Properties2;
        }

        private IEnumerable<ClassDetails> GetAllClasses()
        {
            var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            var assemblies = allAssemblies
                .SelectMany(assem => assem.GetTypes().Where(i => i.IsDefined(typeof(ExportToJavascriptAttribute)) && i.Name.Contains("Address")).ToList()).ToList();
            var details = assemblies.Select(t => new ClassDetails
            {
                ClassType = t,
                Properties = GetProperties(t),
                Properties2 = GetPropertiesWithAttributes(t)
            }).ToArray();

            return details;
        }

        private List<PropertyInfo> GetProperties(Type type)
        {
            var props = type.GetProperties().ToList();

            return props;
        }

        private List<KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>> GetPropertiesWithAttributes(Type type)
        {
            var props = type.GetProperties().ToList();
            var result = new List<KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>>();

            foreach (var prop in props)
            {
                var attrs = prop.CustomAttributes;
                var propWithAttributes = new KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>(prop, attrs);
                result.Add(propWithAttributes);
            }

            return result;
        }

        private string GetTypeScriptType(Type type, IEnumerable<Type> allClasses)
        {
            if (type == typeof(bool))
            {
                return "boolean";
            }
            if (type == typeof(string))
            {
                return "string";
            }
            if (type == typeof(DateTime))
            {
                return "Date";
            }
            if (type == typeof(DateTimeOffset))
            {
                return "Date";
            }
            if (type == typeof(int))
            {
                return "number";
            }
            if (type == typeof(decimal))
            {
                return "number";
            }
            if (type == typeof(double))
            {
                return "number";
            }
            if (type == typeof(float))
            {
                return "number";
            }
            if (type == typeof(long))
            {
                return "number";
            }
            if (type.IsGenericType && type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                var genericType = type.GenericTypeArguments[0];
                var match = allClasses.Where(c => c == genericType).FirstOrDefault();
                if (match != null)
                {
                    return "Array<" + match.Name + ">";
                }
                return "Array<" + GetTypeScriptType(genericType, allClasses) + ">";
            }
            if (type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                return "Array<any>";
            }
            if (type.IsClass)
            {
                return "Object";
            }
            return "any";
        }

        private string GetKOTypeScriptType(Type type, IEnumerable<Type> allClasses)
        {
            if (type == typeof(bool))
            {
                return "KnockoutObservable<boolean>";
            }
            if (type == typeof(string))
            {
                return "KnockoutObservable<string>";
            }
            if (type == typeof(DateTime))
            {
                return "KnockoutObservable<Date>";
            }
            if (type == typeof(DateTimeOffset))
            {
                return "KnockoutObservable<Date>";
            }
            if (type == typeof(int))
            {
                return "KnockoutObservable<number>";
            }
            if (type == typeof(decimal))
            {
                return "KnockoutObservable<number>";
            }
            if (type == typeof(double))
            {
                return "KnockoutObservable<number>";
            }
            if (type == typeof(float))
            {
                return "KnockoutObservable<number>";
            }
            if (type == typeof(long))
            {
                return "KnockoutObservable<number>";
            }
            if (type.IsGenericType && type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                var genericType = type.GenericTypeArguments[0];
                var match = allClasses.Where(c => c == genericType).FirstOrDefault();
                if (match != null)
                {
                    return "KnockoutObservableArray<" + match.Name + ">";
                }
                return "KnockoutObservableArray<" + GetTypeScriptType(genericType, allClasses) + ">";
            }
            if (type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                return "KnockoutObservableArray<any>";
            }
            if (type.IsClass)
            {
                return "KnockoutObservable<Object>";
            }
            return "KnockoutObservable<any>";
        }

        private string GetKOConstructor(string name, Type type, IEnumerable<Type> allClasses)
        {
            if (type == typeof(bool))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(string))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(DateTime))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(DateTimeOffset))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(int))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(decimal))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(double))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(float))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type == typeof(long))
            {
                return "ko.observable(data." + name + ")";
            }
            if (type.IsGenericType && type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                var genericType = type.GenericTypeArguments[0];
                var match = allClasses.Where(c => c == genericType).FirstOrDefault();
                if (match != null)
                {
                    return "ko.observableArray(data." + name + ")";
                }
                return "ko.observableArray(data." + name + ")";
            }
            if (type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                return "ko.observableArray(data." + name + ")";
            }
            if (type.IsClass)
            {
                return "ko.observable(data." + name + ")";
            }

            return "ko.observable(data." + name + ")";
        }

        private string GetKOType(Type type, IEnumerable<Type> allClasses)
        {
            if (type == typeof(bool))
            {
                return "ko.observable()";
            }
            if (type == typeof(string))
            {
                return "ko.observable()";
            }
            if (type == typeof(DateTime))
            {
                return "ko.observable()";
            }
            if (type == typeof(DateTimeOffset))
            {
                return "ko.observable()";
            }
            if (type == typeof(int))
            {
                return "ko.observable()";
            }
            if (type == typeof(decimal))
            {
                return "ko.observable()";
            }
            if (type == typeof(double))
            {
                return "ko.observable()";
            }
            if (type == typeof(float))
            {
                return "ko.observable()";
            }
            if (type == typeof(long))
            {
                return "ko.observable()";
            }
            if (type.IsGenericType && type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                var genericType = type.GenericTypeArguments[0];
                var match = allClasses.Where(c => c == genericType).FirstOrDefault();
                if (match != null)
                {
                    return "ko.observableArray()";
                }
                return "ko.observableArray()";
            }
            if (type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                return "ko.observableArray()";
            }
            if (type.IsClass)
            {
                return "ko.observable()";
            }

            return "ko.observable()";
        }

        private void WriteClasses(IEnumerable<ClassDetails> allClasses, IEnumerable<Type> allClassTypes)
        {
            foreach (ClassDetails aClass in allClasses)
            {
                // str.AppendLine a Knockout Class
                str.AppendLine("class " + aClass.ClassType.Name + "Poco {\r\n");
                foreach (PropertyInfo pi in aClass.Properties)
                {
                    //str.AppendLine("    {0}: {1};\r\n", pi.Name, GetKOTypeScriptType(pi.PropertyType, allClassTypes));
                    str.AppendLine(string.Format("    {0} = {1};\r\n", pi.Name, GetKOType(pi.PropertyType, allClassTypes)));
                }

                // Create toJS Method
                str.AppendLine("\r\n    toJSON(data): I" + aClass.ClassType.Name + " {\r\n");
                str.AppendLine("        var _js = ko.mapping.toJSON(data);\r\n");
                str.AppendLine("        return _js;\r\n");
                str.AppendLine("    }\r\n\r\n");

                // Create update() Method
                str.AppendLine("    Update(data: I" + aClass.ClassType.Name + ") {\r\n");
                foreach (PropertyInfo pi in aClass.Properties)
                {
                    str.AppendLine(string.Format("        this.{0}(data.{0});\r\n", pi.Name));
                }
                str.AppendLine("    }\r\n");

                // Close the Class
                str.AppendLine("}\r\n\r\n");
            }
        }

        private void WriteClasses2(IEnumerable<ClassDetails> allClasses, IEnumerable<Type> allClassTypes)
        {
            foreach (ClassDetails aClass in allClasses)
            {
                str.AppendLine("class " + aClass.ClassType.Name + "Poco {\r\n");
                foreach (KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi in aClass.Properties2)
                {
                    str.AppendLine(string.Format("    {0} = {1}", pi.Key.Name, GetKOType(pi.Key.PropertyType, allClassTypes)));
                    if (pi.Value.Count() > 0)
                    {
                        foreach (var attr in pi.Value)
                        {
                            if (attr.AttributeType.Equals(typeof(RequiredAttribute)))
                            {
                                str.Append(".extend({ required: { params: true");

                                var message = attr.NamedArguments.FirstOrDefault(i => i.MemberName == "ErrorMessage");
                                if (message != null 
                                    && message.TypedValue != null
                                    && message.TypedValue.Value != null
                                    && !string.IsNullOrWhiteSpace(message.TypedValue.Value.ToString()))
                                {
                                    var msg = SpecialCharacterToHtmlEntities(message.TypedValue.Value.ToString());
                                    str.Append(string.Format(", message: '{0}'", msg));
                                }
                                else
                                {
                                    str.AppendLine(string.Format(", message: 'O Campo {0} é obrigatório'", pi.Key.Name));
                                }

                                str.Append(" } })");
                            }

                            //if (attr.AttributeType.Equals(typeof(RequiredAttribute)))
                            //{
                            //    str.Append(".extend({ required: true })");
                            //}
                        }
                    }
                    str.Append(";\r\n");
                }

                // Create toJS Method
                str.AppendLine("\r\n    toJSON(data): I" + aClass.ClassType.Name + " {\r\n");
                str.AppendLine("        var _js = ko.mapping.toJSON(data);\r\n");
                str.AppendLine("        return _js;\r\n");
                str.AppendLine("    }\r\n\r\n");

                // Create update() Method
                str.AppendLine("    Update(data: I" + aClass.ClassType.Name + ") {\r\n");
                foreach (PropertyInfo pi in aClass.Properties)
                {
                    str.AppendLine(string.Format("        this.{0}(data.{0});\r\n", pi.Name));
                }
                str.AppendLine("    }\r\n");

                // Close the Class
                str.AppendLine("}\r\n\r\n");
            }
        }

        private void WriteInterfaces(IEnumerable<ClassDetails> allClasses, IEnumerable<Type> allClassTypes)
        {
            foreach (ClassDetails aClass in allClasses)
            {
                // str.AppendLine an Interface for Data
                str.AppendLine("interface I" + aClass.ClassType.Name + " {\r\n");

                foreach (PropertyInfo pi in aClass.Properties)
                {
                    str.AppendLine(string.Format("    {0}: {1};\r\n", pi.Name, GetTypeScriptType(pi.PropertyType, allClassTypes)));
                }
                str.AppendLine("}\r\n\r\n");
            }
        }

        private string SpecialCharacterToHtmlEntities(string text)
        {
            text = text.Replace("¡", "&iexcl;");
            text = text.Replace("¿", "&iquest;");
            text = text.Replace("'", " &apos; ");

            text = text.Replace("á", "&aacute;");
            text = text.Replace("é", "&eacute;");
            text = text.Replace("í", "&iacute;");
            text = text.Replace("ó", "&oacute;");
            text = text.Replace("ú", "&uacute;");
            text = text.Replace("ñ", "&ntilde;");
            text = text.Replace("ç", "&ccedil;");

            text = text.Replace("Á", "&Aacute;");
            text = text.Replace("É", "&Eacute;");
            text = text.Replace("Í", "&Iacute;");
            text = text.Replace("Ó", "&Oacute;");
            text = text.Replace("Ú", "&Uacute;");
            text = text.Replace("Ñ", "&Ntilde;");
            text = text.Replace("Ç", "&Ccedil;");

            text = text.Replace("à", "&agrave;");
            text = text.Replace("è", "&egrave;");
            text = text.Replace("ì", "&igrave;");
            text = text.Replace("ò", "&ograve;");
            text = text.Replace("ù", "&ugrave;");

            text = text.Replace("À", "&Agrave;");
            text = text.Replace("È", "&Egrave;");
            text = text.Replace("Ì", "&Igrave;");
            text = text.Replace("Ò", "&Ograve;");
            text = text.Replace("Ù", "&Ugrave;");

            text = text.Replace("ä", "&auml;");
            text = text.Replace("ë", "&euml;");
            text = text.Replace("ï", "&iuml;");
            text = text.Replace("ö", "&ouml;");
            text = text.Replace("ü", "&uuml;");

            text = text.Replace("Ä", "&Auml;");
            text = text.Replace("Ë", "&Euml;");
            text = text.Replace("Ï", "&Iuml;");
            text = text.Replace("Ö", "&Ouml;");
            text = text.Replace("Ü", "&Uuml;");

            text = text.Replace("â", "&acirc;");
            text = text.Replace("ê", "&ecirc;");
            text = text.Replace("î", "&icirc;");
            text = text.Replace("ô", "&ocirc;");
            text = text.Replace("û", "&ucirc;");

            text = text.Replace("Â", "&Acirc;");
            text = text.Replace("Ê", "&Ecirc;");
            text = text.Replace("Î", "&Icirc;");
            text = text.Replace("Ô", "&Ocirc;");
            text = text.Replace("Û", "&Ucirc;");

            return text;
        }
    }
}