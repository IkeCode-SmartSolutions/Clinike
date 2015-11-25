using System.Collections.Generic;

namespace IkeCode.Clinike.Admin.Web.Models
{
    internal class SelectOptionModel
    {
        public object Value { get; set; }
        public string DisplayText { get; set; }
        
        public static List<SelectOptionModel> GetModelList(Dictionary<object, object> dic)
        {
            if (dic != null && dic.Count > 0)
            {
                var list = new List<SelectOptionModel>(dic.Count);

                foreach (var item in dic)
                {
                    list.Add(new SelectOptionModel() { Value = item.Key, DisplayText = item.Value.ToString() });
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
