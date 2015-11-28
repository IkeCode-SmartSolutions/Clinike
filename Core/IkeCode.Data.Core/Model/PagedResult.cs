using IkeCode.Data.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Model
{
    /// <summary>
    /// Encapsulate result list into a normalized, ready for pagination
    /// </summary>
    /// <typeparam name="TResult">Type of Items List</typeparam>
    public class PagedResult<TResult> : IIkeCodePaged
    {
        /// <summary>
        /// Items to be skipped
        /// </summary>
        public int Offset { get; private set; }
        
        /// <summary>
        /// Max number of items to be returned
        /// </summary>
        public int Limit { get; private set; }

        /// <summary>
        /// Total of all items os collection
        /// </summary>
        public int TotalCount { get; private set; }

        /// <summary>
        /// Item to be returned
        /// </summary>
        public ICollection<TResult> Items { get; private set; }

        /// <summary>
        /// Generic constructor
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <param name="totalCount"></param>
        /// <param name="items"></param>
        public PagedResult(int offset, int limit, int totalCount, ICollection<TResult> items)
        {
            Offset = offset;
            Limit = limit;
            TotalCount = totalCount;
            Items = items;
        }

        /// <summary>
        /// Helper constructor to PagedList
        /// </summary>
        /// <param name="paged"></param>
        public PagedResult(PagedList<TResult> paged)
        {
            Offset = paged.Offset;
            Limit = paged.Limit;
            TotalCount = paged.TotalCount;
            Items = paged;
        }
    }
}
