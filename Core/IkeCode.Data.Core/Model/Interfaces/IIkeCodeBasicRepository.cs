using IkeCode.Web.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Model.Interfaces
{
    public interface IIkeCodeBasicRepository<TObject, TKey>
        where TObject : IkeCodeModel<TObject, TKey>
    {
        DbContext _context { get; }

        PagedList<TObject> GetPaged(int offset = 0, int limit = 10, ICollection<string> includes = null, bool asNoTracking = false);
        PagedList<TObject> GetPaged(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        Task<PagedList<TObject>> GetPagedAsync(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null);
        PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null);
        Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
    }
}
