using Newtonsoft.Json;
using System.Collections.Generic;

namespace IkeCode.Clinike.Admin.Web.Models
{
    internal class EasyUiListModel<T>
    {
        public bool success { get; private set; }
        public string message { get; set; }
        public ICollection<T> rows { get; set; }
        public int total { get; private set; }

        public EasyUiListModel()
        {
            rows = new List<T>();
            total = 0;
        }

        public EasyUiListModel(ICollection<T> records)
            : this()
        {
            rows = records;
            total = records.Count;
            success = true;
            message = "OK";
        }

        public EasyUiListModel(string errorMessage)
            : this()
        {
            success = false;
            message = errorMessage;
        }
    }
}
