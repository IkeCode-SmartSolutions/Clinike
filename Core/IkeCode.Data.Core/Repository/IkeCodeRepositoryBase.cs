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
    public class IkeCodeRepositoryBase<TObject, TKey> : IIkeCodeRepositoryBase<TObject, TKey>
        where TObject : IkeCodeModel<TKey>
    {
        public DbContext _context { get; private set; }

        public IkeCodeRepositoryBase(DbContext context)
        {
            this._context = context;
        }

        public IPagedResult<TObject> Get(int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return Run((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return result;
            });
        }

        public IPagedResult<TObject> Get(int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return Run((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return result;
            });
        }

        public async Task<IPagedResult<TObject>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return await RunAsync(async (_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public async Task<IPagedResult<TObject>> GetAsync(int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return await RunAsync(async (_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public IPagedResult<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return result;
            });
        }

        public IPagedResult<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return result;
            });
        }

        public async Task<IPagedResult<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return await RunAsync(async (_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public async Task<IPagedResult<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, Expression<Func<TObject, TKey>> orderBy = null, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return await RunAsync(async (_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                results = ApplyOrderBy(results, orderBy);

                var result = new PagedResult<TObject>(results, offset, limit);

                return await Task.Run(() => { return result; });
            });
        }

        public TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.FirstOrDefault();
            });
        }

        public TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.FirstOrDefault();
            });
        }

        public async Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return await RunAsync((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.FirstOrDefaultAsync();
            });
        }

        public async Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return await RunAsync((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.FirstOrDefaultAsync();
            });
        }

        public void Save(Expression<Func<TObject, object>> identifier, TObject entity)
        {
            Run((_context) =>
            {
                var logs = new StringBuilder();
                _context.Database.Log = (log) =>
                {
                    logs.AppendLine(log);
                };

                _context.Set<TObject>().AddOrUpdate(identifier, entity);

                _context.SaveChanges();
            });
        }

        public async Task SaveAsync(Expression<Func<TObject, object>> identifier, TObject entity)
        {
            await RunAsync(async (_context) =>
            {
                var logs = new StringBuilder();
                _context.Database.Log = (log) =>
                {
                    logs.AppendLine(log);
                };

                _context.Set<TObject>().AddOrUpdate(identifier, entity);

                return await _context.SaveChangesAsync();
            });
        }

        public void Delete(TKey key)
        {
            Run((_context) =>
            {
                var entry = _context.Set<TObject>().Find(key);
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
                var entry = _context.Set<TObject>().Find(key);

                if (entry != null)
                {
                    _context.Entry(entry).State = EntityState.Deleted;

                    return await _context.SaveChangesAsync();
                }

                return await Task.FromResult(0);
            });
        }

        public void Delete(TObject t)
        {
            Run((_context) =>
            {
                _context.Set<TObject>().Attach(t);
                _context.Set<TObject>().Remove(t);

                _context.SaveChanges();
            });
        }

        public async Task DeleteAsync(TObject t)
        {
            await RunAsync(async (_context) =>
            {
                _context.Set<TObject>().Attach(t);
                _context.Set<TObject>().Remove(t);

                return await _context.SaveChangesAsync();
            });
        }

        public int Count()
        {
            return Run<int>((_context) =>
            {
                return _context.Set<TObject>().Count();
            });
        }

        public async Task<int> CountAsync()
        {
            return await RunAsync(async (_context) =>
            {
                return await _context.Set<TObject>().CountAsync();
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

        protected static IQueryable<TObject> ApplyIncludes(IQueryable<TObject> query, params Expression<Func<TObject, object>>[] includes)
        {
            if (includes != null && includes.Length > 0)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }

        protected static IQueryable<TObject> ApplyIncludes(IQueryable<TObject> query, IEnumerable<string> includes)
        {
            if (includes != null && includes.Count() > 0)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }

        protected static IQueryable<TObject> ApplyAsNoTracking(IQueryable<TObject> query, bool asNoTracking)
        {
            if (asNoTracking)
            {
                query.AsNoTracking();
            }
            return query;
        }

        private static IQueryable<TObject> ApplyOrderBy(IQueryable<TObject> results, Expression<Func<TObject, TKey>> orderBy)
        {
            results = orderBy == null ? results.OrderBy(i => i.Id) : results.OrderBy(orderBy);
            return results;
        }

        #endregion
    }
}
