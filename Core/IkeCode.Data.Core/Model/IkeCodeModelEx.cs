namespace IkeCode.Web.Core.Model
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;

    public class IkeCodeModelEx<TObject, TContext> : IkeCodeModel<TObject, TContext>
        where TObject : IkeCodeModel<TObject, TContext>, new()
        where TContext : DbContext, new()
    {
        public static TObject Get(int id, ICollection<string> includes = null, bool asNoTracking = false)
        {
            return RunStatic((_context) =>
            {
                var results = _context.Set<TObject>().Where(i => i.Id == id);
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                return results.FirstOrDefault();
            });
        }

        public static TObject Get(int id, bool asNoTracking, params Expression<Func<TObject, object>>[] includes)
        {
            return RunStatic((_context) =>
            {
                var results = _context.Set<TObject>().Where(i => i.Id == id);
                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);
                return results.FirstOrDefault();
            });
        }

        public static async Task<TObject> GetAsync(int id, ICollection<string> includes = null, bool asNoTracking = false)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(i => i.Id == id);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.FirstOrDefaultAsync();
            };
        }

        public static async Task<TObject> GetAsync(int id, bool asNoTracking, params Expression<Func<TObject, object>>[] includes)
        {
            using (var _context = GetDefaultContext())
            {
                var results = _context.Set<TObject>().Where(i => i.Id == id);

                results = ApplyAsNoTracking(results, asNoTracking);
                results = ApplyIncludes(results, includes);

                return await results.FirstOrDefaultAsync();
            };
        }

        new public static TObject AddOrUpdate(Expression<Func<TObject, object>> identifier, TObject entity)
        {
            return RunStatic((_context) =>
            {
                var memberName = "";
                var body = identifier.Body;
                if (body.NodeType == ExpressionType.Convert)
                    body = ((UnaryExpression)body).Operand;

                if ((body as MemberExpression) != null)
                {
                    memberName = (body as MemberExpression).Member.Name;
                }

                var memberValue = entity.GetType().GetProperty(memberName).GetValue(entity);
                if (memberValue == null)
                    throw new InvalidOperationException("Unable to perform AddOrUpdate method because your Identifier does not have value on the Entity passed");

                var parameter = Expression.Parameter(typeof(TObject));
                var memberExpression = Expression.Property(parameter, memberName);

                Expression<Func<TObject, bool>> lambdaResult = Expression.Lambda<Func<TObject, bool>>(Expression.Equal(memberExpression, Expression.Constant(memberValue)), parameter);

                var originalObject = Find(lambdaResult);
                if (originalObject != null && entity.Id <= 0)
                    entity.Id = originalObject.Id;

                entity.PrepareToDatabase();

                if (entity.Id == 0)
                {
                    _context.Set<TObject>().Add(entity);
                }
                else
                {
                    _context.Set<TObject>().Attach(originalObject);
                    _context.Entry<TObject>(originalObject).CurrentValues.SetValues(entity);
                    _context.Entry<TObject>(originalObject).State = EntityState.Modified;
                }

                _context.SaveChanges();

                return entity;
            });
        }
    }
}
