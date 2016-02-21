using IkeCode.Core.CustomAttributes;
using IkeCode.Data.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.SqlTypes;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Web.Core.Model
{
    public class IkeCodeModel<TObject, TKey> : IkeCodeModelEx<TObject, TKey>
        where TObject : IkeCodeModel<TObject, TKey>
    {
        public IkeCodeModel(DbContext context)
            : base(context)
        {
        }
        
        public IkeCodeModel(DbContext context, TKey id)
            : this(context)
        {
            Id = id;
        }
        
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual TKey Id { get; set; }

        [Column(TypeName = "datetime")]
        [DateTimeDatabaseGenerated]
        public DateTime DateIns { get; set; }

        [Column(TypeName = "datetime")]
        [DateTimeDatabaseGenerated]
        public DateTime LastUpdate { get; set; }

        public virtual void PrepareToDatabase()
        {
            LastUpdate = DateTime.UtcNow;

            if (DateIns <= (DateTime)SqlDateTime.MinValue)
                DateIns = DateTime.UtcNow;
        }

        public void PrepareListToDatabase(IEnumerable<IIkeCodeModel<TKey>> items)
        {
            if (items != null && items.Count() > 0)
            {
                foreach (var item in items)
                {
                    item.PrepareToDatabase();
                }
            }
        }

        public TObject Save(Expression<Func<TObject, object>> identifier)
        {
            return base.Run((_context) =>
            {
                var logs = new StringBuilder();
                _context.Database.Log = (log) =>
                {
                    logs.AppendLine(log);
                };

                this.PrepareToDatabase();

                _context.Set<TObject>().AddOrUpdate(identifier, (TObject)this);

                _context.SaveChanges();

                return (TObject)this;
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

        public async Task<int> DeleteAsync(TKey key)
        {
            return await RunAsync(async (_context) =>
            {
                var entry = _context.Set<TObject>().Find(key);

                if (entry != null)
                {
                    _context.Entry(entry).State = EntityState.Deleted;

                    return await _context.SaveChangesAsync();
                }

                return 0;
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

        public async Task<int> DeleteAsync(TObject t)
        {
            return await RunAsync(async (_context) =>
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
    }
}
