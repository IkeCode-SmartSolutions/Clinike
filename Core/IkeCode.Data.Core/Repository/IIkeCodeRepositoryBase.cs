namespace IkeCode.Data.Core.Repository
{
    using IkeCode.Core;
    using IkeCode.Data.Core.Model;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq.Expressions;
    using System.Threading.Tasks;

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

        TEntityInterface Find(TKey key);
        TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, string includes = null);
        TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);
        Task<TEntityInterface> FindAsync(TKey key);
        Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, string includes = null);
        Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, ICollection<string> includes = null);
        Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes);

        int Save(Expression<Func<TEntityInterface, object>> identifier, TEntityInterface entity);
        Task<int> SaveAsync(Expression<Func<TEntityInterface, object>> identifier, TEntityInterface entity);

        int Update(TKey key, TEntityInterface entity);
        Task<int> UpdateAsync(TKey key, TEntityInterface entity);

        int Delete(TKey key);
        int Delete(TEntityInterface t);
        Task<int> DeleteAsync(TKey key);
        Task<int> DeleteAsync(TEntityInterface t);

        int Count();
        Task<int> CountAsync();
    }
}
