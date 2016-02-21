using IkeCode.Data.Core.Model;
using IkeCode.Data.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace IkeCode.Web.Core.Model
{
    public class IkeCodeModelEx<TObject, TKey> : IIkeCodeBasicRepository<TObject, TKey>
        where TObject : IkeCodeModel<TObject, TKey>
    {
        public DbContext _context { get; private set; }

        public IkeCodeModelEx(DbContext context)
        {
            this._context = context;
        }
        
        public PagedList<TObject> GetPaged(int offset = 0, int limit = 10, ICollection<string> includes = null, bool asNoTracking = false)
        {
            return Run((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public PagedList<TObject> GetPaged(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return Run((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public async Task<PagedList<TObject>> GetPagedAsync(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return await RunAsync((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedListAsync(offset, limit);
            });
        }

        public PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return Run((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public async Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return await RunAsync((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedListAsync(offset, limit);
            });
        }

        public async Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return await RunAsync((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedListAsync(offset, limit);
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

        #endregion
    }
}
