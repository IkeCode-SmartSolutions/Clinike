using Newtonsoft.Json;
using System.Collections.Generic;

namespace IkeCode.Clinike.Admin.Web.Models
{
    internal class JTableListModel<T>
    {
        public string Result { get; private set; }
        public string Message { get; set; }
        public ICollection<T> Records { get; set; }
        public int TotalRecordCount { get; private set; }

        public JTableListModel()
        {
            Result = "OK";
            Records = new List<T>();
            TotalRecordCount = 0;
        }

        public JTableListModel(ICollection<T> records)
            : this()
        {
            Records = records;
            TotalRecordCount = records.Count;
        }

        public JTableListModel(string message)
        {
            Result = "ERROR";
            Message = message;
        }

        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
