using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Repository
{
    public class IkeCodeRepositoryBase<TEntity, TEntityInterface, TKey> : IIkeCodeRepositoryBase<TEntityInterface, TKey>
        where TEntity : IkeCodeModel<TKey>, TEntityInterface
        where TEntityInterface : IIkeCodeBaseModel<TKey>
    {
        public DbContext _context { get; private set; }

        public IkeCodeRepositoryBase(DbContext context)
        {
            this._context = context;
        }

        public IPagedResult<TEntityInterface> Get(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null)
        {
            var parsedIncludes = !string.IsNullOrWhiteSpace(includes) ? includes.Split(',') : null;
            return Get(offset, limit, orderBy, asNoTracking, parsedIncludes);
        }

        public IPagedResult<TEntityInterface> Get(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return Run((_context) =>
            {
                IQueryable<TEntityInterface> results = _context.Set<TEntity>();
                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);
                results = ApplyOrderBy2(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return result;
            });
        }

        public IPagedResult<TEntityInterface> Get(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes)
        {
            return Run((_context) =>
            {
                IQueryable<TEntityInterface> results = _context.Set<TEntity>();
                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);
                results = ApplyOrderBy2(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return result;
            });
        }

        public async Task<IPagedResult<TEntityInterface>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null)
        {
            var parsedIncludes = !string.IsNullOrWhiteSpace(includes) ? includes.Split(',') : null;
            return await GetAsync(offset, limit, orderBy, asNoTracking, parsedIncludes);
        }

        public async Task<IPagedResult<TEntityInterface>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return await RunAsync(async (_context) =>
            {
                IQueryable<TEntity> results = _context.Set<TEntity>();
                
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy3(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public async Task<IPagedResult<TEntityInterface>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes)
        {
            return await RunAsync(async (_context) =>
            {
                IQueryable<TEntityInterface> results = _context.Set<TEntity>();

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);
                results = ApplyOrderBy2(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public IPagedResult<TEntityInterface> FindAll(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null)
        {
            var parsedIncludes = !string.IsNullOrWhiteSpace(includes) ? includes.Split(',') : null;
            return FindAll(match, offset, limit, orderBy, asNoTracking, parsedIncludes);
        }

        public IPagedResult<TEntityInterface> FindAll(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);
                results = ApplyOrderBy2(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return result;
            });
        }

        public IPagedResult<TEntityInterface> FindAll(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);
                results = ApplyOrderBy2(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return result;
            });
        }

        public async Task<IPagedResult<TEntityInterface>> FindAllAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, string includes = null)
        {
            var parsedIncludes = !string.IsNullOrWhiteSpace(includes) ? includes.Split(',') : null;
            return await FindAllAsync(match, offset, limit, orderBy, asNoTracking, parsedIncludes);
        }

        public async Task<IPagedResult<TEntityInterface>> FindAllAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return await RunAsync(async (_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);
                results = ApplyOrderBy2(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public async Task<IPagedResult<TEntityInterface>> FindAllAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, Expression<Func<TEntityInterface, object>> orderBy = null, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes)
        {
            return await RunAsync(async (_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);
                results = ApplyOrderBy2(results, orderBy);

                var result = new PagedResult<TEntityInterface>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, string includes = null)
        {
            var parsedIncludes = !string.IsNullOrWhiteSpace(includes) ? includes.Split(',') : null;
            return Find(match, asNoTracking, parsedIncludes);
        }

        public TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);

                return results.FirstOrDefault();
            });
        }

        public TEntityInterface Find(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);

                return results.FirstOrDefault();
            });
        }

        public async Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, string includes = null)
        {
            var parsedIncludes = !string.IsNullOrWhiteSpace(includes) ? includes.Split(',') : null;
            return await FindAsync(match, asNoTracking, parsedIncludes);
        }

        public async Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return await RunAsync((_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);

                return results.FirstOrDefaultAsync();
            });
        }

        public async Task<TEntityInterface> FindAsync(Expression<Func<TEntityInterface, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TEntityInterface, object>>[] includes)
        {
            return await RunAsync((_context) =>
            {
                var results = _context.Set<TEntity>().Where(match);

                results = ApplyAsNoTracking2(results, asNoTracking);
                results = ApplyIncludes2(results, includes);

                return results.FirstOrDefaultAsync();
            });
        }

        public void Save(Expression<Func<TEntityInterface, object>> identifier, TEntityInterface entity)
        {
            Run((_context) =>
            {
                _context.Set<TEntity>().AddOrUpdate(Cast(identifier), (TEntity)entity);

                _context.SaveChanges();
            });
        }

        public async Task SaveAsync(Expression<Func<TEntityInterface, object>> identifier, TEntityInterface entity)
        {
            await RunAsync(async (_context) =>
            {
                _context.Set<TEntity>().AddOrUpdate(Cast(identifier), (TEntity)entity);

                return await _context.SaveChangesAsync();
            });
        }

        public void Update(TKey key, TEntityInterface entity)
        {
            Run((_context) =>
            {
                var oldEntity = _context.Set<TEntity>().Find(key);
                _context.Entry(oldEntity).CurrentValues.SetValues(entity);
                return _context.SaveChanges();
            });
        }

        public async Task UpdateAsync(TKey key, TEntityInterface entity)
        {
            await RunAsync(async (_context) =>
            {
                var oldEntity = _context.Set<TEntity>().Find(key);
                _context.Entry(oldEntity).CurrentValues.SetValues(entity);
                return await _context.SaveChangesAsync();
            });
        }

        public void Delete(TKey key)
        {
            Run((_context) =>
            {
                var entry = _context.Set<TEntity>().Find(key);
                if (entry != null)
                {
                    _context.Entry(entry).State = EntityState.Deleted;
                    _context.SaveChanges();
                }
            });
        }

        public async Task DeleteAsync(TKey key)
        {
            await RunAsync(async (_context) =>
            {
                var entry = _context.Set<TEntity>().Find(key);

                if (entry != null)
                {
                    _context.Entry(entry).State = EntityState.Deleted;

                    return await _context.SaveChangesAsync();
                }

                return await Task.FromResult(0);
            });
        }

        public void Delete(TEntityInterface t)
        {
            Run((_context) =>
            {
                _context.Set<TEntity>().Attach((TEntity)t);
                _context.Set<TEntity>().Remove((TEntity)t);

                _context.SaveChanges();
            });
        }

        public async Task DeleteAsync(TEntityInterface t)
        {
            await RunAsync(async (_context) =>
            {
                _context.Set<TEntity>().Attach((TEntity)t);
                _context.Set<TEntity>().Remove((TEntity)t);

                return await _context.SaveChangesAsync();
            });
        }

        public int Count()
        {
            return Run<int>((_context) =>
            {
                return _context.Set<TEntity>().Count();
            });
        }

        public async Task<int> CountAsync()
        {
            return await RunAsync(async (_context) =>
            {
                return await _context.Set<TEntity>().CountAsync();
            });
        }

        #region Protected Methods

        protected void Run(Action<DbContext> func)
        {
            Run(func);
        }

        protected T Run<T>(Func<DbContext, T> func)
        {
            try
            {
                using (_context)
                {
                    _context.Configuration.ProxyCreationEnabled = false;

                    return func(_context);
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            catch (Exception)
            {
                throw;
            }
        }

        protected async Task RunAsync(Action<DbContext, Task> func)
        {
            await RunAsync(func);
        }

        protected async Task<T> RunAsync<T>(Func<DbContext, Task<T>> func)
        {
            try
            {
                using (_context)
                {
                    _context.Configuration.ProxyCreationEnabled = false;

                    return await func(_context);
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            catch (Exception)
            {
                throw;
            }
        }

        protected static IQueryable<TEntity> ApplyIncludes(IQueryable<TEntity> query, params Expression<Func<TEntity, object>>[] includes)
        {
            if (includes != null && includes.Length > 0)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }

        protected static IQueryable<TEntityInterface> ApplyIncludes2(IQueryable<TEntityInterface> query, params Expression<Func<TEntityInterface, object>>[] includes)
        {
            if (includes != null && includes.Length > 0)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }

        protected static IQueryable<TEntity> ApplyIncludes(IQueryable<TEntity> query, IEnumerable<string> includes)
        {
            if (includes != null && includes.Count() > 0)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }

        protected static IQueryable<TEntityInterface> ApplyIncludes2(IQueryable<TEntityInterface> query, IEnumerable<string> includes)
        {
            if (includes != null && includes.Count() > 0)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }

        protected static IQueryable<TEntity> ApplyIncludes(IQueryable<TEntity> query, string includes)
        {
            if (!string.IsNullOrWhiteSpace(includes))
            {
                query = ApplyIncludes(query, includes.Split(','));
            }

            return query;
        }

        protected static IQueryable<TEntity> ApplyAsNoTracking(IQueryable<TEntity> query, bool asNoTracking)
        {
            if (asNoTracking)
            {
                query.AsNoTracking();
            }
            return query;
        }

        protected static IQueryable<TEntityInterface> ApplyAsNoTracking2(IQueryable<TEntityInterface> query, bool asNoTracking)
        {
            if (asNoTracking)
            {
                (query as IQueryable).AsNoTracking();
            }
            return query;
        }

        private static IQueryable<TEntity> ApplyOrderBy(IQueryable<TEntity> results, Expression<Func<TEntity, TKey>> orderBy)
        {
            results = orderBy == null ? results.OrderBy(i => i.Id) : results.OrderBy(orderBy);
            return results;
        }

        private static IQueryable<TEntityInterface> ApplyOrderBy2(IQueryable<TEntityInterface> results, Expression<Func<TEntityInterface, object>> orderBy)
        {
            results = orderBy == null ? results.OrderBy(i => i.Id) : results.OrderBy(orderBy);
            return results;
        }

        private static IQueryable<TEntity> ApplyOrderBy3(IQueryable<TEntity> results, Expression<Func<TEntityInterface, object>> orderBy)
        {
            results = orderBy == null ? results.OrderBy(i => i.Id) : results.OrderBy(orderBy).Cast<TEntity>();
            return results;
        }

        static Expression<Func<TEntity, object>> Cast(Expression<Func<TEntityInterface, object>> expression)
        {
            // Add the boxing operation, but get a weakly typed expression
            Expression converted = Expression.Convert(expression.Body, typeof(object));
            // Use Expression.Lambda to get back to strong typing
            return Expression.Lambda<Func<TEntity, object>>(converted, expression.Parameters);
        }

        #endregion
    }
}
