using IkeCode.Data.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Model
{
    public class PagedList<TResult> : List<TResult>, IIkeCodePaged
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
        /// Paginate IQueryable objects
        /// </summary>
        /// <param name="source">Must to .OrderBy(...) before call PagedList</param>
        /// <param name="offset">Items to be skipped</param>
        /// <param name="limit">Max number of items to be returned</param>
        public PagedList(IQueryable<TResult> source, int offset, int limit)
        {
            TotalCount = source.Count();
            Offset = offset < 1 ? 0 : offset;
            Limit = limit;
            
            var items = source.Skip(Offset).Take(Limit).ToList();

            AddRange(items);
        }
    }

    public static class PagedListExtensions
    {
        /// <summary>
        /// Paginate IQueryable objects
        /// </summary>
        /// <param name="source">Must to .OrderBy(...) before call PagedList</param>
        /// <param name="offset">Items to be skiped</param>
        /// <param name="limit">Items limit</param>
        public static PagedList<TResult> ToPagedList<TResult>(this IQueryable<TResult> source, int offset, int limit)
        {
            return new PagedList<TResult>(source, offset, limit);
        }

        /// <summary>
        /// Paginate IQueryable objects asynchronous
        /// </summary>
        /// <param name="source">Must to .OrderBy(...) before call PagedList</param>
        /// <param name="offset">Items to be skiped</param>
        /// <param name="limit">Items limit</param>
        public static async Task<PagedList<TResult>> ToPagedListAsync<TResult>(this IQueryable<TResult> source, int offset, int limit)
        {
            return await Task.Run<PagedList<TResult>>(() => new PagedList<TResult>(source, offset, limit));
        }

        /// <summary>
        /// Transforms PagedList into PagedResult
        /// </summary>
        /// <param name="paged">PagedList object</param>
        public static PagedResult<TResult> ToPagedResult<TResult>(this PagedList<TResult> paged)
        {
            return new PagedResult<TResult>(paged.Offset, paged.Limit, paged.TotalCount, paged);
        }
    }
}
