namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data;
    using IkeCode.Web.Core.Model;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class IdentityRoleEx : IkeCodeEntityBaseModelEx<IdentityRole, ClinikeContext, string>
    {
    }

    public class ClinikeUserEx : IkeCodeEntityBaseModelEx<ClinikeUser, ClinikeContext, string>
    {
    }
    
    public class ClinikeUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ClinikeUser> manager)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            return userIdentity;
        }

        public string UniqueId { get; set; }

        //[ForeignKey("Person")]
        //public int? Person_Id { get; set; }
        //public virtual Person Person { get; set; }
    }

    public class IdentityManager
    {
        public bool RoleExists(string name)
        {
            var rm = new RoleManager<IdentityRole>(
                new RoleStore<IdentityRole>(new ClinikeContext()));
            return rm.RoleExists(name);
        }

        public bool CreateRole(string name)
        {
            var rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ClinikeContext()));
            var idResult = rm.Create(new IdentityRole(name));
            return idResult.Succeeded;
        }

        public bool CreateUser(ClinikeUser user, string password)
        {
            var um = new UserManager<ClinikeUser>(new UserStore<ClinikeUser>(new ClinikeContext()));
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

        public bool AddUserToRole(string userId, string roleName)
        {
            var um = new UserManager<ClinikeUser>(new UserStore<ClinikeUser>(new ClinikeContext()));
            var idResult = um.AddToRole(userId, roleName);
            return idResult.Succeeded;
        }

        public void ClearUserRoles(string userId)
        {
            var um = new UserManager<ClinikeUser>(new UserStore<ClinikeUser>(new ClinikeContext()));
            var user = um.FindById(userId);
            var currentRoles = new List<IdentityUserRole>();
            currentRoles.AddRange(user.Roles);
            foreach (var role in currentRoles)
            {
                um.RemoveFromRole(userId, role.RoleId);
            }
        }
    }
}
