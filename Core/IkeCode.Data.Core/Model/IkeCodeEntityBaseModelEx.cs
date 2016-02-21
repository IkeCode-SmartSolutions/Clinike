using IkeCode.Data.Core.Model;
using IkeCode.Web.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Web.Core.Model
{
    public class IkeCodeEntityBaseModelEx<TObject, TContext, TKey>
        where TObject : class, new()
        where TContext : DbContext, new()
    {
        protected string connectionStringName { get; set; }

        public IkeCodeEntityBaseModelEx()
        {

        }

        public IkeCodeEntityBaseModelEx(string connectionStringName)
            : this()
        {
            this.connectionStringName = connectionStringName;
        }

        public static TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return RunStatic((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.FirstOrDefault();
            });
        }

        public static TObject Find(Expression<Func<TObject, bool>> match, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return RunStatic((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.FirstOrDefault();
            });
        }

        public static async Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, bool asNoTracking = false, ICollection<string> includes = null)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.FirstOrDefaultAsync();
            }
        }

        public static async Task<TObject> FindAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.FirstOrDefaultAsync();
            }
        }

        private static PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return RunStatic<PagedList<TObject>>((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.ToPagedList(offset, limit);
            });
        }

        private static PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return RunStatic<PagedList<TObject>>((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.ToPagedList(offset, limit);
            });
        }

        private static async Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.ToPagedListAsync(offset, limit);
            }
        }

        private static async Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.ToPagedListAsync(offset, limit);
            }
        }

        #region Protected Methods

        protected TContext GetContext()
        {
            if (string.IsNullOrWhiteSpace(connectionStringName))
            {
                return new TContext();
            }
            else
            {
                return (TContext)Activator.CreateInstance(typeof(TContext), connectionStringName);
            }
        }

        protected static TContext GetDefaultContext()
        {
            return new TContext();
        }

        protected static void RunStatic(Action<TContext> func)
        {
            using (var _context = GetDefaultContext())
            {
                _context.Configuration.ProxyCreationEnabled = false;
                func(_context);
            }
        }

        protected static T RunStatic<T>(Func<TContext, T> func)
        {
            try
            {
                using (var _context = GetDefaultContext())
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
            catch(Exception)
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
