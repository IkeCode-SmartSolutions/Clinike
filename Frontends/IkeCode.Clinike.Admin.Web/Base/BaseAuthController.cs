using IkeCode.Clinike.Data;
using IkeCode.Clinike.Data.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System.Web;

namespace Clinike.Admin.Base
{
    public class BaseAuthController : BaseController
    {
        protected IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        protected BaseAuthController()
            : base(new UserManager<ClinikeUser>(new UserStore<ClinikeUser>(new ClinikeContext())))
        {
        }
    }
}