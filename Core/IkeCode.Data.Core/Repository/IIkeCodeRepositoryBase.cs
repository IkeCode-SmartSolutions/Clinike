using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Repository
{
    public interface IIkeCodeRepositoryBase<TObject, TKey>
        where TObject : class
    {
        DbContext _context { get; }

        IPagedResult<TObject> Get(int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null);
        IPagedResult<TObject> Get(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        Task<IPagedResult<TObject>> GetAsync(int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null);
        Task<IPagedResult<TObject>> GetAsync(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);

        IPagedResult<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null);
        IPagedResult<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        Task<IPagedResult<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null);
        Task<IPagedResult<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);

        TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);
        Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes);

        void Save(Expression<Func<TObject, object>> identifier, TObject entity);
        Task SaveAsync(Expression<Func<TObject, object>> identifier, TObject entity);

        void Delete(TKey key);
        void Delete(TObject t);
        Task DeleteAsync(TKey key);
        Task DeleteAsync(TObject t);

        int Count();
        Task<int> CountAsync();
    }
}
