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
    public class IkeCodeEntityModelEx<TObject, TContext, TKey> : IkeCodeEntityBaseModelEx<TObject, TContext, TKey>
        where TObject : class, new()
        where TContext : DbContext, new()
    {
        public IkeCodeEntityModelEx()
            : base()
        {
        }

        public IkeCodeEntityModelEx(string connectionStringName)
            : base(connectionStringName)
        {
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
    }
}
