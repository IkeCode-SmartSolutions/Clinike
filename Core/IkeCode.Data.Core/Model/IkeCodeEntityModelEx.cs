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
    public class IkeCodeEntityModelEx<TObject, TContext, TKey>
        where TObject : class, new()
        where TContext : DbContext, new()
    {
        protected string connectionStringName { get; set; }

        public IkeCodeEntityModelEx()
        {

        }

        public IkeCodeEntityModelEx(string connectionStringName)
            : this()
        {
            this.connectionStringName = connectionStringName;
        }

        public static ICollection<TObject> GetAll(ICollection<string> includes = null, bool asNoTracking = false)
        {
            return RunStatic<ICollection<TObject>>((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.ToList();
            });
        }

        public static ICollection<TObject> GetAll(bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return RunStatic<ICollection<TObject>>((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.ToList();
            });
        }

        private static async Task<PagedList<TObject>> GetAllAsync(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            using (var _context = GetDefaultContext())
            {
                IQueryable<TObject> results = _context.Set<TObject>();

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.ToPagedListAsync(offset, limit);
            };
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

        public static TObject AddOrUpdate(Expression<Func<TObject, object>> identifier, TObject entity)
        {
            return RunStatic((_context) =>
            {
                _context.Set<TObject>().AddOrUpdate(identifier, entity);
                _context.SaveChanges();

                return entity;
            });
        }

        public static TObject Add(TObject entity)
        {
            return RunStatic((_context) =>
            {
                var logs = new StringBuilder();
                _context.Database.Log = (log) =>
                {
                    logs.AppendLine(log);
                };

                _context.Set<TObject>().Add(entity);
                _context.SaveChanges();

                return entity;
            });
        }

        public static async Task<TObject> AddAsync(TObject t)
        {
            using (var _context = GetDefaultContext())
            {
                _context.Set<TObject>().Add(t);
                await _context.SaveChangesAsync();

                return t;
            }
        }

        public static TObject Update(TKey key, TObject updated)
        {
            return RunStatic((_context) =>
            {
                if (updated == null)
                    return null;

                TObject existing = _context.Set<TObject>().Find(key);
                if (existing != null)
                {
                    _context.Set<TObject>().Attach(existing);
                    _context.Entry(existing).CurrentValues.SetValues(updated);

                    _context.SaveChanges();
                }
                return updated;
            });
        }

        public static async Task<TObject> UpdateAsync(TKey key, TObject updated)
        {
            using (var _context = GetDefaultContext())
            {
                if (updated == null)
                    return null;

                TObject existing = await _context.Set<TObject>().FindAsync(key);
                if (existing != null)
                {
                    _context.Set<TObject>().Attach(existing);
                    _context.Entry(existing).CurrentValues.SetValues(updated);

                    await _context.SaveChangesAsync();
                }

                return updated;
            }
        }

        public static void Delete(TKey key)
        {
            RunStatic((_context) =>
            {
                var entry = _context.Set<TObject>().Find(key);
                if (entry != null)
                {
                    _context.Entry(entry).State = EntityState.Deleted;
                    _context.SaveChanges();
                }
            });
        }

        public static async Task<int> DeleteAsync(TKey key)
        {
            using (var _context = GetDefaultContext())
            {
                var entry = _context.Set<TObject>().Find(key);

                if (entry != null)
                {
                    _context.Entry(entry).State = EntityState.Deleted;

                    return await _context.SaveChangesAsync();
                }

                return 0;
            }
        }

        public static void Delete(TObject t)
        {
            RunStatic((_context) =>
            {
                _context.Set<TObject>().Attach(t);
                _context.Set<TObject>().Remove(t);

                _context.SaveChanges();
            });
        }

        public static async Task<int> DeleteAsync(TObject t)
        {
            using (var _context = GetDefaultContext())
            {
                _context.Set<TObject>().Attach(t);
                _context.Set<TObject>().Remove(t);

                return await _context.SaveChangesAsync();
            }
        }

        public static int Count()
        {
            return RunStatic<int>((_context) =>
            {
                return _context.Set<TObject>().Count();
            });
        }

        public static async Task<int> CountAsync()
        {
            using (var _context = GetDefaultContext())
            {
                return await _context.Set<TObject>().CountAsync();
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
