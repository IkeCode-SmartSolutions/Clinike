namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data;
    using IkeCode.Data.Core.Identity;
    using IkeCode.Web.Core.Model;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;

    public class ClinikeIdentityRoleEx : IkeCodeEntityModelEx<ClinikeIdentityRole, ClinikeContext, string>
    {
    }

    public class ClinikeIdentityRole : IdentityRole
    {
        [Required(AllowEmptyStrings = false)]
        [DefaultValue("No Title")]
        public string Title { get; set; }
    }

    public class ClinikeIdentityManager : IkeCodeIdentityManager<ClinikeContext, ClinikeUser, ClinikeIdentityRole>
    {
    }
}
