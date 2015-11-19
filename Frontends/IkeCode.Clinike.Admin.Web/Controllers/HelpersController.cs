using Clinike.Admin.Base;
using IkeCode.Clinike.Admin.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Web.Mvc;
using System.Linq;
using System.Text;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using IkeCode.Core.CustomAttributes;

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

            WriteClasses(allClasses, allClassTypes);

            return Json(str.ToString(), JsonRequestBehavior.AllowGet);
        }

        class ClassDetails
        {
            public Type ClassType;
            public List<PropertyInfo> DatabaseGeneratedProperties;
            public List<KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>> Properties;
        }

        private IEnumerable<ClassDetails> GetAllClasses()
        {
            var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            var assemblies = allAssemblies
                .SelectMany(assem => assem.GetTypes().Where(i => i.IsDefined(typeof(ExportToJavascriptAttribute))
                    && i.Name.Contains("Address"))).ToList();
            var details = assemblies.Select(t => new ClassDetails
            {
                ClassType = t,
                DatabaseGeneratedProperties = GetDatabaseGeneratedProperties(t),
                Properties = GetPropertiesWithAttributes(t)
            }).ToArray();

            return details;
        }

        private List<PropertyInfo> GetDatabaseGeneratedProperties(Type type)
        {
            var props = type.GetProperties().Where(i => i.IsDefined(typeof(DatabaseGeneratedAttribute))
                                                        || i.IsDefined(typeof(DateTimeDatabaseGeneratedAttribute))).ToList();
            return props;
        }

        private List<KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>> GetPropertiesWithAttributes(Type type)
        {
            var props = type.GetProperties().Where(i => !i.IsDefined(typeof(NotMappedAttribute))
                                                        && !i.IsDefined(typeof(JsonIgnoreAttribute))
                                                        && !i.IsDefined(typeof(DatabaseGeneratedAttribute))
                                                        && !i.IsDefined(typeof(DateTimeDatabaseGeneratedAttribute))).ToList();
            var result = new List<KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>>();

            foreach (var prop in props)
            {
                var attrs = prop.CustomAttributes;
                var propWithAttributes = new KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>>(prop, attrs);
                result.Add(propWithAttributes);
            }

            return result;
        }

        private void WriteClasses(IEnumerable<ClassDetails> allClasses, IEnumerable<Type> allClassTypes)
        {
            foreach (ClassDetails aClass in allClasses)
            {
                str.AppendLine("class " + aClass.ClassType.Name + "Poco {\r\n");

                foreach (PropertyInfo dbpi in aClass.DatabaseGeneratedProperties)
                {
                    str.AppendLine(string.Format("    {0}: {1};\r\n", dbpi.Name, GetTypeScriptType(dbpi.PropertyType, allClassTypes)));
                }

                foreach (KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi in aClass.Properties)
                {
                    str.AppendLine(string.Format("    {0} = {1}", pi.Key.Name, GetKOType(pi.Key.PropertyType, allClassTypes)));
                    if (pi.Value.Count() > 0)
                    {
                        var display = ParseDisplayName(pi);

                        foreach (var attr in pi.Value)
                        {
                            var errorMessage = ParseErrorMessage(display, attr);

                            if (attr.AttributeType.Equals(typeof(RequiredAttribute)))
                            {
                                ParseRequiredAttribute(display, errorMessage);
                            }

                            if (attr.AttributeType.Equals(typeof(StringLengthAttribute)))
                            {
                                ParseStringLengthAttribute(pi, attr, display, errorMessage);
                            }

                            if (attr.AttributeType.Equals(typeof(MaxLengthAttribute)))
                            {
                                ParseMaxLengthAttribute(pi, display, attr, errorMessage);
                            }

                            if (attr.AttributeType.Equals(typeof(MinLengthAttribute)))
                            {
                                ParseMinLengthAttribute(pi, display, attr, errorMessage);
                            }
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
                foreach (PropertyInfo piDbGen in aClass.DatabaseGeneratedProperties)
                {
                    str.AppendLine(string.Format("        this.{0} = data.{0};\r\n", piDbGen.Name));
                }

                foreach (KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi2 in aClass.Properties)
                {
                    str.AppendLine(string.Format("        this.{0}(data.{0});\r\n", pi2.Key.Name));
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

                foreach (PropertyInfo piDbGen in aClass.DatabaseGeneratedProperties)
                {
                    str.AppendLine(string.Format("    {0}: {1};\r\n", piDbGen.Name, GetTypeScriptType(piDbGen.PropertyType, allClassTypes)));
                }

                foreach (KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi in aClass.Properties)
                {
                    str.AppendLine(string.Format("    {0}: {1};\r\n", pi.Key.Name, GetTypeScriptType(pi.Key.PropertyType, allClassTypes)));
                }
                str.AppendLine("}\r\n\r\n");
            }
        }

        private string ParseDisplayName(KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi)
        {
            var displayAttr = pi.Value.FirstOrDefault(i => i.AttributeType.Equals(typeof(DisplayAttribute)));
            if (displayAttr != null)
            {
                var name = displayAttr.NamedArguments.FirstOrDefault(i => i.MemberName == "Name");
                if (name != null
                    && name.TypedValue != null
                    && name.TypedValue.Value != null
                    && !string.IsNullOrWhiteSpace(name.TypedValue.Value.ToString()))
                {
                    return name.TypedValue.Value.ToString();
                }
            }

            return pi.Key.Name;
        }

        private string ParseErrorMessage(string display, CustomAttributeData attr)
        {
            var errorMessageAttr = attr.NamedArguments.FirstOrDefault(i => i.MemberName == "ErrorMessage");
            if (errorMessageAttr != null
                && errorMessageAttr.TypedValue != null
                && errorMessageAttr.TypedValue.Value != null
                && !string.IsNullOrWhiteSpace(errorMessageAttr.TypedValue.Value.ToString()))
            {
                return errorMessageAttr.TypedValue.Value.ToString().Replace("{display}", display);
            }
            return string.Empty;
        }

        private void ParseRequiredAttribute(string display, string errorMessage)
        {
            str.Append(".extend({ required: { params: true");

            if (!string.IsNullOrWhiteSpace(errorMessage))
            {
                str.Append(string.Format(", message: '{0}'", errorMessage));
            }
            else
            {
                var format = "O campo {0} é obrigatório";
                var msg = string.Format(format, display);
                str.Append(string.Format(", message: '{0}'", msg));
            }

            str.Append(" } })");
        }

        private void ParseMinLengthAttribute(KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi, string display, CustomAttributeData attr, string errorMessage)
        {
            var minLength = attr.ConstructorArguments.FirstOrDefault();
            if (minLength != null && !string.IsNullOrWhiteSpace(minLength.Value.ToString()))
            {
                int minValue = 0;
                Int32.TryParse(minLength.Value.ToString(), out minValue);
                AddMinLengthExtend(display, errorMessage, minValue, pi.Key.PropertyType);
            }
        }

        private void ParseMaxLengthAttribute(KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi, string display, CustomAttributeData attr, string errorMessage)
        {
            var maxLength = attr.ConstructorArguments.FirstOrDefault();
            if (maxLength != null && !string.IsNullOrWhiteSpace(maxLength.Value.ToString()))
            {
                int maxValue = 0;
                Int32.TryParse(maxLength.Value.ToString(), out maxValue);
                AddMaxLengthExtend(display, errorMessage, maxValue, pi.Key.PropertyType);
            }
        }

        private void ParseStringLengthAttribute(KeyValuePair<PropertyInfo, IEnumerable<CustomAttributeData>> pi, CustomAttributeData attr, string display, string errorMessage)
        {
            var maxLength = attr.ConstructorArguments.FirstOrDefault();
            if (maxLength != null && !string.IsNullOrWhiteSpace(maxLength.Value.ToString()))
            {
                if (!pi.Value.Any(i => i.AttributeType.Equals(typeof(MaxLengthAttribute))))
                {
                    int maxValue = 0;
                    Int32.TryParse(maxLength.Value.ToString(), out maxValue);
                    AddMaxLengthExtend(display, errorMessage, maxValue, pi.Key.PropertyType);
                }

                var minLength = attr.NamedArguments.FirstOrDefault(i => i.MemberName == "MinimumLength");
                if (minLength != null
                    && minLength.TypedValue != null
                    && minLength.TypedValue.Value != null
                    && !string.IsNullOrWhiteSpace(minLength.TypedValue.Value.ToString()))
                {
                    if (!pi.Value.Any(i => i.AttributeType.Equals(typeof(MinLengthAttribute))))
                    {
                        int minValue = 0;
                        Int32.TryParse(minLength.TypedValue.Value.ToString(), out minValue);

                        if (minValue > 0)
                        {
                            AddMinLengthExtend(display, errorMessage, minValue, pi.Key.PropertyType);
                        }
                    }
                }
            }
        }

        private void AddMaxLengthExtend(string display, string errorMessage, int maxValue, Type propType)
        {
            var validationType = string.Empty;
            var messageFormat = string.Empty;
            if (propType == typeof(string))
            {
                validationType = "maxLength";
                messageFormat = "O campo {0} deve ter no máximo {1} caracteres";
            }
            else
            {
                validationType = "max";
                messageFormat = "O campo {0} deve ser menor que {1}";
            }

            str.Append(string.Format(".extend({{ {0}: {{ params: {1}", validationType, maxValue));

            if (!string.IsNullOrWhiteSpace(errorMessage))
            {
                var parsedMsg = errorMessage.Replace("{length}", maxValue.ToString());
                str.Append(string.Format(", message: '{0}'", parsedMsg));
            }
            else
            {
                var parsedMsg = string.Format(messageFormat, display, maxValue.ToString());
                str.Append(string.Format(", message: '{0}'", parsedMsg));
            }

            str.Append(" } })");
        }

        private void AddMinLengthExtend(string display, string errorMessage, int minValue, Type propType)
        {
            var validationType = string.Empty;
            var messageFormat = string.Empty;
            if (propType == typeof(string))
            {
                validationType = "minLength";
                messageFormat = "O campo {0} deve ter pelo menos {1} caracteres";
            }
            else
            {
                validationType = "min";
                messageFormat = "O campo {0} deve ser maior que {1}";
            }

            str.Append(string.Format(".extend({{ {0}: {{ params: {1}", validationType, minValue));

            if (!string.IsNullOrWhiteSpace(errorMessage))
            {
                var parsedMsg = errorMessage.Replace("{length}", minValue.ToString());
                str.Append(string.Format(", message: '{0}'", parsedMsg));
            }
            else
            {
                var parsedMsg = string.Format(messageFormat, display, minValue.ToString());
                str.Append(string.Format(", message: '{0}'", parsedMsg));
            }

            str.Append(" } })");
        }

        private string GetTypeScriptType(Type type, IEnumerable<Type> allClasses)
        {
            if (type == typeof(bool))
            {
                return "boolean";
            }
            else if (type == typeof(string))
            {
                return "string";
            }
            else if (type == typeof(DateTime) || type == typeof(DateTimeOffset))
            {
                return "Date";
            }
            else if (type == typeof(int) || type == typeof(decimal) || type == typeof(double) || type == typeof(float) || type == typeof(long))
            {
                return "number";
            }
            else if (type.IsGenericType && type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                var genericType = type.GenericTypeArguments[0];
                var match = allClasses.Where(c => c == genericType).FirstOrDefault();
                if (match != null)
                {
                    return "Array<" + match.Name + ">";
                }
                return "Array<" + GetTypeScriptType(genericType, allClasses) + ">";
            }
            else if (type.GetInterfaces().Contains(typeof(System.Collections.IEnumerable)))
            {
                return "Array<any>";
            }
            else if (type.IsClass)
            {
                return "Object";
            }
            else
            {
                return "any";
            }
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
    }
}