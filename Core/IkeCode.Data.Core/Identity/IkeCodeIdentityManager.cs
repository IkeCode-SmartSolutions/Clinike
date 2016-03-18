using IkeCode.Data.Core.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Linq;

namespace IkeCode.Data.Core.Identity
{
    public class IkeCodeIdentityManager<TContext, TUser, TIdentityRole>
        where TContext : IkeCodeIdentityDbContext<TUser>, new()
        where TUser : IdentityUser
        where TIdentityRole : IdentityRole, new()
    {
        protected string connectionStringName { get; set; }

        public IkeCodeIdentityManager()
        {

        }

        public IkeCodeIdentityManager(string connectionStringName)
            : this()
        {
            this.connectionStringName = connectionStringName;
        }

        TContext GetContext()
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

        public bool RoleExists(string name)
        {
            using (var rm = new RoleManager<TIdentityRole>(new RoleStore<TIdentityRole>(GetContext())))
            {
                return rm.RoleExists(name);
            }
        }

        public bool CreateRole(TIdentityRole role)
        {
            using (var rm = new RoleManager<TIdentityRole>(new RoleStore<TIdentityRole>(GetContext())))
            {
                var idResult = rm.Create(role);
                return idResult.Succeeded;
            }
        }

        public bool CreateUser(TUser user, string password)
        {
            using (var um = new UserManager<TUser>(new UserStore<TUser>(GetContext())))
            {
                try
                {
                    var idResult = um.Create(user, password);
                    return idResult.Succeeded;
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public bool AddUserToRole(string userId, string roleName)
        {
            using (var um = new UserManager<TUser>(new UserStore<TUser>(GetContext())))
            {
                var idResult = um.AddToRole(userId, roleName);
                return idResult.Succeeded;
            }
        }

        public void ClearUserRoles(string userId)
        {
            using (var um = new UserManager<TUser>(new UserStore<TUser>(GetContext())))
            {
                var user = um.FindById(userId);
                um.RemoveFromRoles(userId, user.Roles.Select(i => i.RoleId).ToArray());
            }
        }
    }
}
