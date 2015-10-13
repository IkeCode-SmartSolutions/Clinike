namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data;
    using IkeCode.Web.Core.Model;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Security.Claims;
    using System.Threading.Tasks;

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
    }
}
