using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Repository
{
    public interface IIkeCodeRepositoryBase<TEntityInterface, TKey>
        where TEntityInterface : IIkeCodeBaseModel<TKey>
    {
        DbContext _context { get; }

        IPagedResult<TEntityInterface> Get(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null);
        IPagedResult<TEntityInterface> Get(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null);
        IPagedResult<TEntityInterface> Get(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);
        Task<IPagedResult<TEntityInterface>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null);
        Task<IPagedResult<TEntityInterface>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null);
        Task<IPagedResult<TEntityInterface>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);

        IPagedResult<TEntityInterface> FindAll(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null);
        IPagedResult<TEntityInterface> FindAll(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null);
        IPagedResult<TEntityInterface> FindAll(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);
        Task<IPagedResult<TEntityInterface>> FindAllAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null);
        Task<IPagedResult<TEntityInterface>> FindAllAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null);
        Task<IPagedResult<TEntityInterface>> FindAllAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);

        TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, string includes = null);
        TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);
        Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, string includes = null);
        Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);

        void Save(Expression<Func<TEntityInterface, object>> identifier, TEntityInterface entity);
        Task SaveAsync(Expression<Func<TEntityInterface, object>> identifier, TEntityInterface entity);

        void Update(TKey key, TEntityInterface entity);
        Task UpdateAsync(TKey key, TEntityInterface entity);

        void Delete(TKey key);
        void Delete(TEntityInterface t);
        Task DeleteAsync(TKey key);
        Task DeleteAsync(TEntityInterface t);

        int Count();
        Task<int> CountAsync();
    }
}
