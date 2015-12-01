using IkeCode.Data.Core.Model;
using IkeCode.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace IkeCode.Clinike.Admin.Web.Models
{
    internal class JsonListModel<T>
    {
        public bool success { get; private set; }
        public string message { get; set; }
        public int rowCount { get; set; }
        public ICollection<T> rows { get; set; }
        public int total { get; private set; }
        public int current = 1;
        private int offset { get; set; }
        private int limit { get; set; }

        private JsonListModel(int offset = 0, int limit = 1)
        {
            rows = new List<T>();
            total = 0;
            total = 0;
            current = 1;
            this.offset = offset;
            this.limit = limit;
        }

        public JsonListModel(ICollection<T> records, int total, int offset, int limit)
            : this(offset, limit)
        {
            rows = records;
            rowCount = records.Count;
            this.total = total;
            success = true;
            message = "OK";
            SetCurrentField();
        }

        public JsonListModel(PagedResult<T> pagedResult)
            : this(pagedResult.Offset, pagedResult.Limit)
        {
            rows = pagedResult.Items;
            rowCount = rows.Count;
            total = pagedResult.TotalCount;
            success = true;
            message = "OK";
            SetCurrentField();
        }

        public JsonListModel(PagedList<T> pagedList)
            : this(pagedList.Offset, pagedList.Limit)
        {
            rows = pagedList;
            rowCount = rows.Count;
            total = pagedList.TotalCount;
            success = true;
            message = "OK";
            SetCurrentField();
        }

        public JsonListModel(string errorMessage)
            : this()
        {
            success = false;
            message = errorMessage;
        }

        private void SetCurrentField()
        {
            var result = Math.Floor((double)offset / (double)limit).ToInt32();
            current = result + 1;
        }
    }
}
