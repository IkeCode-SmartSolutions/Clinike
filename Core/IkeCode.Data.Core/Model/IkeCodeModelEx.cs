namespace IkeCode.Web.Core.Model
{
    using Data.Core.Model;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using System.Data.Entity.Migrations;
    using IkeCode.Web.Core.Model.Interfaces;
    using System.Text;

    public class IkeCodeModelEx<TObject, TContext, TKey> : IkeCodeEntityModelEx<TObject, TContext, TKey>
        where TObject : class, IIkeCodeModel<TKey>, new()
        where TContext : DbContext, new()
    {
        public IkeCodeModelEx()
        {

        }

        public IkeCodeModelEx(string connectionStringName)
            : base(connectionStringName)
        {
        }

        public static PagedList<TObject> GetAll(int offset = 0, int limit = 10, ICollection<string> includes = null, bool asNoTracking = false)
        {
            return RunStatic<PagedList<TObject>>((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public static PagedList<TObject> GetAll(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return RunStatic<PagedList<TObject>>((_context) =>
            {
                IQueryable<TObject> results = _context.Set<TObject>();
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public static async Task<PagedList<TObject>> GetAllAsync(int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            using (var _context = GetDefaultContext())
            {
                IQueryable<TObject> results = _context.Set<TObject>();

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.OrderBy(i => i.Id).ToPagedListAsync(offset, limit);
            };
        }

        public static PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null)
        {
            return RunStatic<PagedList<TObject>>((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public static PagedList<TObject> FindAll(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            return RunStatic<PagedList<TObject>>((_context) =>
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return results.OrderBy(i => i.Id).ToPagedList(offset, limit);
            });
        }

        public static async Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, ICollection<string> includes = null)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.OrderBy(i => i.Id).ToPagedListAsync(offset, limit);
            }
        }

        public static async Task<PagedList<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match, int offset = 0, int limit = 10, bool asNoTracking = false, params Expression<Func<TObject, object>>[] includes)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(match);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.OrderBy(i => i.Id).ToPagedListAsync(offset, limit);
            }
        }

        new public static TObject AddOrUpdate(Expression<Func<TObject, object>> identifier, TObject entity)
        {
            return RunStatic((_context) =>
            {
                var logs = new StringBuilder();
                _context.Database.Log = (log) =>
                {
                    logs.AppendLine(log);
                };

                //var memberName = "";
                //var body = identifier.Body;
                //if (body.NodeType == ExpressionType.Convert)
                //    body = ((UnaryExpression)body).Operand;
                
                //if ((body as MemberExpression) != null)
                //{
                //    memberName = (body as MemberExpression).Member.Name;
                //}
                
                //var memberValue = entity.GetType().GetProperty(memberName).GetValue(entity);
                //if (memberValue == null)
                //    throw new InvalidOperationException("Unable to perform AddOrUpdate method because your Identifier does not have value on the Entity passed");
                
                //var parameter = Expression.Parameter(typeof(TObject));
                //var memberExpression = Expression.Property(parameter, memberName);
                
                //Expression<Func<TObject, bool>> lambdaResult = Expression.Lambda<Func<TObject, bool>>(Expression.Equal(memberExpression, Expression.Constant(memberValue)), parameter);

                //var originalObject = Find(lambdaResult);
                //if (originalObject != null && entity.Id <= 0)
                //    entity.Id = originalObject.Id;

                entity.PrepareToDatabase();

                _context.Set<TObject>().AddOrUpdate(identifier, entity);

                //if (entity.Id == 0)
                //{
                //    _context.Set<TObject>().Add(entity);
                //}
                //else
                //{
                //    _context.Set<TObject>().Attach(originalObject);
                //    _context.Entry<TObject>(originalObject).CurrentValues.SetValues(entity);
                //    _context.Entry<TObject>(originalObject).State = EntityState.Modified;
                //}

                _context.SaveChanges();

                return entity;
            });
        }
    }
}
