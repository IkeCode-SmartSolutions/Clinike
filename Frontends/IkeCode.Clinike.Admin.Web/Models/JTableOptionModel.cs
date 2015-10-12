using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc.Html;

namespace IkeCode.Clinike.Admin.Web.Models
{
    internal class JTableOptionModel
    {
        public object Value { get; set; }
        public string DisplayText { get; set; }

        public static List<JTableOptionModel> GetModelList(Dictionary<string, object> dic)
        {
            if (dic != null && dic.Count > 0)
            {
                var list = new List<JTableOptionModel>(dic.Count);

                foreach (var item in dic)
                {
                    list.Add(new JTableOptionModel() { DisplayText = item.Key, Value = item.Value });
                }

                return list;
            }
            else
            {
                return null;
            }
        }
    }
}
