using IkeCode.Clinike.Data;
using IkeCode.Clinike.Data.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

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