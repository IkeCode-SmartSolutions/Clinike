using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Mvc.Html;

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
            this.Result = "OK";
            this.Records = new List<T>();
            this.TotalRecordCount = 0;
        }

        public JTableListModel(ICollection<T> records)
            : this()
        {
            this.Records = records;
            this.TotalRecordCount = records.Count;
        }

        public JTableListModel(string message)
        {
            this.Result = "ERROR";
            this.Message = message;
        }

        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
