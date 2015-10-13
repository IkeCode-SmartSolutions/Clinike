using IkeCode.Clinike.Data;
using IkeCode.Clinike.Data.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Clinike.Admin.Base
{
    public class BaseAuthController : BaseController
    {
        protected BaseAuthController()
            : base(new UserManager<ClinikeUser>(new UserStore<ClinikeUser>(new ClinikeContext())))
        {            
        }
   }
}